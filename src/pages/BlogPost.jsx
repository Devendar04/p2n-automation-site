import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import RichText from "../components/RichText";
import { useBlog } from "../lib/content";
import { usePageMeta } from "../lib/pageMeta";

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

export default function BlogPost() {
  const { slug } = useParams();
  const { blog, others, loading } = useBlog(slug);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  usePageMeta(blog?.title, blog?.excerpt);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {loading ? (
        <div className="pt-40 pb-40 grid place-items-center text-offwhite/65">
          <Loader2 className="animate-spin" size={26} />
        </div>
      ) : !blog ? (
        <section className="pt-32 pb-32 container-page text-center">
          <h1 className="kinetic-headline text-3xl sm:text-5xl text-offwhite">Post not found</h1>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-acid font-semibold uppercase text-sm">
            <ArrowLeft size={16} /> Back to the blog
          </Link>
        </section>
      ) : (
        <>
          <header className="pt-16 border-b-2 border-zincline">
            <div className="container-page py-14 sm:py-20 max-w-3xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-offwhite/65 hover:text-acid transition-colors mb-8"
              >
                <ArrowLeft size={14} /> All posts
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-semibold uppercase text-acid border border-acid px-2 py-1">{blog.tag}</span>
                <span className="flex items-center gap-1 text-xs text-offwhite/65 uppercase">
                  <Clock size={12} aria-hidden="true" /> {blog.reading_time_minutes} min read
                </span>
              </div>
              <h1 className="kinetic-headline text-3xl sm:text-5xl text-offwhite !leading-[0.95]">{blog.title}</h1>
              <p className="mt-6 text-sm text-offwhite/65 normal-case">
                By <span className="font-semibold text-offwhite/80">{blog.author_name}</span>
                {blog.published_at && <> · {formatDate(blog.published_at)}</>}
              </p>
            </div>
          </header>

          <article className="container-page py-14 sm:py-16 max-w-3xl">
            {blog.cover_image_url && (
              <img src={blog.cover_image_url} alt="" className="w-full max-h-[420px] object-cover border-2 border-zincline mb-10" />
            )}
            <RichText text={blog.content} className="text-base sm:text-lg" />
          </article>

          {others.length > 0 && (
            <section className="bg-mist border-y-2 border-zincline">
              <div className="container-page py-14 max-w-5xl">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-offwhite/65 mb-6">Keep reading</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      to={`/blog/${o.slug}`}
                      className="group border-2 border-zincline bg-void p-6 transition-shadow hover:shadow-[6px_6px_0px_0px_#017AFB] inview:shadow-[6px_6px_0px_0px_#017AFB]"
                    >
                      <span className="text-xs font-semibold uppercase text-acid">{o.tag}</span>
                      <h3 className="mt-2 font-display font-semibold uppercase text-offwhite text-lg leading-snug">{o.title}</h3>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-acid">
                        Read <ArrowUpRight size={13} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="container-page py-14 text-center">
            <p className="text-offwhite/70 normal-case mb-5">Have a project in mind? Let's talk it through.</p>
            <button
              onClick={() => setSchedulerOpen(true)}
              className="inline-flex items-center gap-2 bg-acid text-void text-sm font-semibold uppercase px-7 py-3 border-2 border-acid hover:bg-void hover:text-acid transition-colors"
            >
              Book a conversation <ArrowUpRight size={16} />
            </button>
          </section>
        </>
      )}

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
