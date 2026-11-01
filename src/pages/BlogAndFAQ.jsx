import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, ChevronDown, Loader2, Clock, Code2, Cpu, GraduationCap, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { supabase } from "../lib/supabaseClient";
import { useBlogs } from "../lib/content";
import { usePageMeta } from "../lib/pageMeta";

const TAG_ICON = { Software: Code2, Hardware: Cpu, Training: GraduationCap };

const FAQS = [
  {
    q: "What's the typical timeline for a B2B software or hardware project?",
    a: "Discovery and scoping run 1–2 weeks. Most software engagements ship an MVP in 6–10 weeks; hardware/IoT rollouts typically run 10–16 weeks depending on component lead times and on-site installation.",
  },
  {
    q: "What warranty comes with hardware deployments?",
    a: "All hardware ships with a 12-month parts-and-labor warranty, plus an optional extended support plan covering firmware updates and on-site diagnostics for up to 3 years.",
  },
  {
    q: "What training tracks are available for students?",
    a: "We run three tracks: Software Engineering (React/Node), Hardware & Embedded Systems (IoT, firmware), and AI & Automation. Each track is 12 weeks, project-based, and runs alongside live client work.",
  },
  {
    q: "Do interns receive a certification at the end of the program?",
    a: "Yes — every student who completes their track receives a certificate co-signed by our CTO, plus a portfolio entry documenting the real client or capstone project they shipped.",
  },
];

function BlogCard({ blog, onOpenComments }) {
  const [likeCount, setLikeCount] = useState(blog.like_count);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liked || liking) return;
    setLiking(true);
    setLikeCount((c) => c + 1);
    setLiked(true);

    if (blog.__seed) {
      setLiking(false);
      return;
    }
    const { data, error } = await supabase.rpc("increment_blog_like", { blog_id: blog.id });

    if (error) {
      setLikeCount((c) => c - 1);
      setLiked(false);
    } else if (typeof data === "number") {
      setLikeCount(data);
    }
    setLiking(false);
  };

  return (
    <article className="border-2 border-zincline bg-void overflow-hidden flex flex-col">
      {blog.cover_image_url ? (
        <img src={blog.cover_image_url} alt="" loading="lazy" className="w-full h-44 object-cover" />
      ) : (
        <div className="h-28 bg-mist border-b-2 border-zincline grid place-items-center">
          {(() => {
            const TagIcon = TAG_ICON[blog.tag] ?? Code2;
            return <TagIcon size={34} strokeWidth={1.4} className="text-acid" aria-hidden="true" />;
          })()}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase text-acid border border-acid px-2 py-1">{blog.tag}</span>
          <span className="flex items-center gap-1 text-xs text-offwhite/65 uppercase">
            <Clock size={12} /> {blog.reading_time_minutes} min
          </span>
        </div>

        <h3 className="font-display font-semibold text-offwhite text-lg leading-snug mb-2 uppercase">
          <Link to={`/blog/${blog.slug}`} className="hover:text-acid transition-colors">{blog.title}</Link>
        </h3>
        <p className="text-sm text-offwhite/70 leading-relaxed normal-case mb-5 flex-1">{blog.excerpt}</p>

        <div className="flex items-center gap-3 mb-4">
          {blog.author_avatar_url ? (
            <img src={blog.author_avatar_url} alt={blog.author_name} className="w-7 h-7 object-cover" />
          ) : (
            <div className="w-7 h-7 bg-acid text-void grid place-items-center text-xs font-bold">
              {blog.author_name?.[0]}
            </div>
          )}
          <span className="text-xs font-semibold text-offwhite/70 normal-case">{blog.author_name}</span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t-2 border-zincline">
          <button
            onClick={handleLike}
            disabled={liked || liking}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              liked ? "text-correction" : "text-offwhite/65 hover:text-correction"
            }`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
            {likeCount}
          </button>
          {!blog.__seed && (
            <button
              onClick={() => onOpenComments(blog)}
              className="flex items-center gap-1.5 text-sm text-offwhite/65 hover:text-acid transition-colors"
            >
              <MessageSquare size={16} />
              Comments
            </button>
          )}
          <Link
            to={`/blog/${blog.slug}`}
            className="ml-auto flex items-center gap-1 text-xs font-semibold uppercase text-acid hover:text-offwhite transition-colors"
          >
            Read <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CommentDrawer({ blog, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);

  const loadComments = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("blog_id", blog.id)
      .order("created_at", { ascending: true });
    setComments(data || []);
    setLoading(false);
  }, [blog.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;
    setPosting(true);
    const { error } = await supabase.from("blog_comments").insert({
      blog_id: blog.id,
      author_name: author.trim(),
      comment_body: body.trim(),
    });
    setPosting(false);
    if (!error) {
      setBody("");
      loadComments();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-void border-2 border-zincline max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b-2 border-zincline">
          <h3 className="font-display font-semibold text-offwhite uppercase">{blog.title}</h3>
          <p className="text-xs text-offwhite/65 mt-0.5">{comments.length} comment{comments.length !== 1 && "s"}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-8 text-offwhite/65">
              <Loader2 size={20} className="animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-offwhite/65 text-center py-8">No comments yet — be the first to weigh in.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="text-sm">
                <span className="font-semibold text-offwhite">{c.author_name}</span>
                <p className="text-offwhite/70 mt-0.5 leading-relaxed normal-case">{c.comment_body}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handlePost} className="px-6 py-4 border-t-2 border-zincline flex flex-col gap-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="bg-void border-2 border-zincline px-3 py-2 text-sm text-offwhite"
          />
          <div className="flex gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              className="flex-1 bg-void border-2 border-zincline px-3 py-2 text-sm text-offwhite resize-none"
            />
            <button
              type="submit"
              disabled={posting}
              className="bg-acid text-void text-sm font-semibold px-4 disabled:opacity-60"
            >
              {posting ? <Loader2 size={16} className="animate-spin" /> : "Post"}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-4 right-4 text-offwhite/65 hover:text-offwhite" aria-label="Close comments">
          ✕
        </button>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div id="faq" className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="border-2 border-zincline overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-offwhite text-sm sm:text-base normal-case">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-acid transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-offwhite/70 leading-relaxed normal-case">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BlogAndFAQ() {
  const { blogs, loading } = useBlogs();
  usePageMeta("Blog & FAQ", "Notes from the delivery floor and the training floor from P2N Automation.");
  const [activeTag, setActiveTag] = useState("All");
  const [commentsFor, setCommentsFor] = useState(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const filtered = activeTag === "All" ? blogs : blogs.filter((b) => b.tag === activeTag);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20 max-w-2xl">
          <h1 className="kinetic-headline text-3xl sm:text-5xl text-offwhite">Blog &amp; FAQ</h1>
          <p className="mt-4 text-offwhite/60 leading-relaxed normal-case">
            Notes from the delivery floor and the training floor — plus
            answers to what clients and prospective students ask us most.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Software", "Hardware", "Training"].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 text-sm font-semibold uppercase transition-colors border-2 ${
                activeTag === tag
                  ? "bg-acid text-void border-acid"
                  : "bg-void border-zincline text-offwhite/60 hover:border-acid"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-offwhite/65">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-offwhite/65 py-16 text-center">No posts published in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onOpenComments={setCommentsFor} />
            ))}
          </div>
        )}
      </section>

      <section className="container-page py-16 border-t-2 border-zincline">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-8">FAQ</h2>
        <FAQAccordion />
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
      {commentsFor && <CommentDrawer blog={commentsFor} onClose={() => setCommentsFor(null)} />}
    </div>
  );
}
