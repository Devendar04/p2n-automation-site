/**
 * ADMIN CMS PORTAL
 * ------------------------------------------------------------------
 * SECURITY NOTE: this panel is gated by Supabase Auth (email/password,
 * server-verified session) — not by client-side password hashing or
 * "AES encryption" of form data. Any logic that runs in the browser
 * (hashing, encryption, key material, a hardcoded password check) ships
 * inside the JS bundle and can be read or bypassed by anyone who opens
 * dev tools, so it can't be the actual security boundary. The real
 * protection here is:
 *   1. supabase.auth.signInWithPassword() — verified against Supabase's
 *      auth server, never checked client-side.
 *   2. Row Level Security policies on every table (see schema.sql) that
 *      only allow INSERT/UPDATE/DELETE when auth.role() = 'authenticated'.
 *      Even if someone bypassed this React component entirely and hit
 *      the Supabase API directly, an unauthenticated request would be
 *      rejected by Postgres itself.
 *   3. Supabase's own session token (JWT), stored and refreshed by the
 *      supabase-js client — this file just reflects that session state,
 *      it doesn't invent its own.
 * There is no public sign-up route. Create admin users from the
 * Supabase Dashboard → Authentication → Users → Invite User.
 * ------------------------------------------------------------------
 */
import { useState, useEffect, useCallback } from "react";
import {
  LogOut,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  FolderKanban,
  GraduationCap,
  Inbox,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { seedBlogs, seedServices } from "../lib/content";
import { PROJECTS } from "../data/siteContent";
import ThemeToggle from "../components/ThemeToggle";

/* ============================== TOASTS ============================== */

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((type, message) => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  return { toasts, push };
}

function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 left-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 border-2 px-4 py-3 text-sm font-medium shadow-hard-sm ${
            t.type === "error"
              ? "bg-correction/10 border-correction text-correction"
              : "bg-acid/10 border-acid text-acid"
          }`}
        >
          {t.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ============================== LOGIN ============================== */

function LoginScreen({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError("Invalid email or password.");
      return;
    }
    onSignedIn(data.session);
  };

  return (
    <div className="min-h-screen bg-void grid place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border-2 border-zincline bg-void p-8"
      >
        <span className="grid place-items-center w-10 h-10 bg-acid text-void font-display font-bold text-sm mb-6">
          P2N
        </span>
        <h1 className="font-display font-semibold uppercase text-offwhite text-xl mb-1">
          Admin Console
        </h1>
        <p className="text-sm text-offwhite/60 normal-case mb-6">
          Sign in with your staff credentials.
        </p>

        <label className="flex flex-col gap-1.5 mb-4">
          <span className="text-xs font-semibold text-offwhite/60 uppercase tracking-wide">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-input"
            placeholder="you@p2nautomation.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 mb-6">
          <span className="text-xs font-semibold text-offwhite/60 uppercase tracking-wide">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-offwhite/60 hover:text-offwhite"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        {error && <p className="text-sm text-correction mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-acid text-void text-sm font-semibold uppercase py-3 border-2 border-acid hover:bg-void hover:text-acid transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <style>{`
          .admin-input {
            width: 100%;
            border: 2px solid rgb(var(--c-zincline));
            background: rgb(var(--c-void));
            color: rgb(var(--c-offwhite));
            padding: 0.6rem 0.75rem;
            font-size: 0.875rem;
          }
          .admin-input:focus {
            outline: none;
            border-color: rgb(var(--c-acid));
          }
        `}</style>
      </form>
    </div>
  );
}

/* ============================== SHARED UI ============================== */

function StatusBadge({ status }) {
  const isPositive = ["Open", "true", true, "published"].includes(status);
  return (
    <span
      className={`font-hand text-xs px-2.5 py-1 border-2 border-graphite -rotate-1 inline-block ${
        isPositive ? "bg-postit text-graphite" : "bg-zincline/30 text-offwhite/70 border-zincline"
      }`}
    >
      {String(status)}
    </span>
  );
}

function AiBadge() {
  return (
    <span
      title="Drafted by AI and not yet reviewed. Saving an edit clears this flag."
      className="ml-2 inline-flex items-center gap-1 align-middle text-[10px] font-semibold uppercase tracking-wide text-acid border border-acid px-1.5 py-0.5"
    >
      <Sparkles size={10} aria-hidden="true" /> AI placeholder
    </span>
  );
}

function IconBtn({ icon: Icon, onClick, label, danger }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`grid place-items-center w-8 h-8 border-2 transition-colors ${
        danger
          ? "border-correction text-correction hover:bg-correction hover:text-white"
          : "border-zincline text-offwhite/70 hover:border-acid hover:text-acid"
      }`}
    >
      <Icon size={14} />
    </button>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} bg-void border-2 border-zincline max-h-[88vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-void flex items-center justify-between px-6 py-4 border-b-2 border-zincline">
          <h3 className="font-display font-semibold uppercase text-offwhite">{title}</h3>
          <button onClick={onClose} className="text-offwhite/60 hover:text-offwhite" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function AField({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-offwhite/60 uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}

/* ============================== TAB 1: BLOGS ============================== */

const BLOG_EMPTY = {
  title: "", slug: "", author_name: "", tag: "Software",
  cover_image_url: "", excerpt: "", content: "", reading_time_minutes: 5,
};

const blank = (row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v ?? ""]));

function BlogsTab({ push }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("published_at", { ascending: false });
    if (error) push("error", "Failed to load blogs.");
    setRows(data || []);
    setLoading(false);
  }, [push]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    const row = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      author_name: form.author_name.trim(),
      tag: form.tag,
      cover_image_url: form.cover_image_url.trim() || null,
      excerpt: form.excerpt.trim() || null,
      content: form.content || null,
      reading_time_minutes: Number(form.reading_time_minutes) || 5,
      is_placeholder: false, // a human has now reviewed this post
    };
    const { error } = form.id
      ? await supabase.from("blogs").update(row).eq("id", form.id)
      : await supabase.from("blogs").insert(row);

    if (error) { push("error", "Could not save the blog post."); return; }
    push("success", form.id ? "Blog updated." : "Blog created.");
    setEditing(null);
    load();
  };

  const importStarter = async () => {
    const have = new Set(rows.map((r) => r.slug));
    const toAdd = seedBlogs
      .filter((b) => !have.has(b.slug))
      // eslint-disable-next-line no-unused-vars
      .map(({ id, __seed, like_count, ...rest }) => rest);
    if (toAdd.length === 0) { push("success", "All starter posts are already imported."); return; }
    const { error } = await supabase.from("blogs").insert(toAdd);
    if (error) { push("error", "Import failed. Check that supabase/002_cms_content.sql has been run."); return; }
    push("success", `${toAdd.length} starter posts imported — edit or delete them below.`);
    load();
  };

  const placeholderCount = rows.filter((r) => r.is_placeholder).length;

  const handleDelete = async (id) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) { push("error", "Could not delete the blog post."); return; }
    push("success", "Blog deleted.");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold uppercase text-offwhite text-lg">Blog Management</h2>
        <div className="flex gap-2">
          <button
            onClick={importStarter}
            className="flex items-center gap-1.5 border-2 border-zincline text-offwhite/80 text-xs font-semibold uppercase px-4 py-2 hover:border-acid hover:text-acid transition-colors"
          >
            <Download size={14} /> Import starter posts
          </button>
          <button
            onClick={() => setEditing({ ...BLOG_EMPTY })}
            className="flex items-center gap-1.5 bg-acid text-void text-xs font-semibold uppercase px-4 py-2"
          >
            <Plus size={14} /> New Post
          </button>
        </div>
      </div>

      {!loading && rows.length === 0 && (
        <p className="mb-4 text-sm text-offwhite/70 normal-case border-2 border-zincline p-4">
          No posts are saved in the database yet, so the public blog is showing the AI-generated starter posts.
          Click <strong>Import starter posts</strong> to copy them here and start editing, or add your own with <strong>New Post</strong>.
        </p>
      )}
      {placeholderCount > 0 && (
        <p className="mb-4 text-sm text-offwhite/70 normal-case border-2 border-acid p-4">
          <strong>{placeholderCount}</strong> post{placeholderCount > 1 ? "s are" : " is"} still AI-generated placeholder content.
          Edit and save a post to mark it as reviewed, or delete it.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-offwhite/65"><Loader2 className="animate-spin" size={22} /></div>
      ) : (
        <div className="border-2 border-zincline overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-zincline text-left text-offwhite/65 uppercase text-xs">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Likes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-zincline last:border-b-0 text-offwhite/80">
                  <td className="px-4 py-3">{b.title}{b.is_placeholder && <AiBadge />}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.tag} /></td>
                  <td className="px-4 py-3 normal-case">{b.author_name}</td>
                  <td className="px-4 py-3">{b.like_count}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <IconBtn icon={Pencil} label="Edit" onClick={() => setEditing(blank(b))} />
                      <IconBtn icon={Trash2} label="Delete" danger onClick={() => handleDelete(b.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-offwhite/65 normal-case">No blog posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit Blog Post" : "New Blog Post"} onClose={() => setEditing(null)}>
          <BlogForm initial={editing} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
}

function BlogForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }}
      className="flex flex-col gap-4"
    >
      <AField label="Title"><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></AField>
      <AField label="Slug"><input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></AField>
      <AField label="Author"><input className="admin-input" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required /></AField>
      <AField label="Category">
        <select className="admin-input" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
          <option>Software</option><option>Hardware</option><option>Training</option>
        </select>
      </AField>
      <AField label="Reading time (minutes)"><input type="number" min="1" className="admin-input" value={form.reading_time_minutes} onChange={(e) => setForm({ ...form, reading_time_minutes: e.target.value })} /></AField>
      <AField label="Cover Image URL"><input className="admin-input" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} /></AField>
      <AField label="Excerpt"><textarea rows={2} className="admin-input resize-none" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></AField>
      <AField label="Content — blank line = new paragraph · ## Heading · - bullet · **bold**"><textarea rows={14} className="admin-input resize-y font-mono text-xs" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></AField>
      <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 bg-acid text-void text-sm font-semibold uppercase py-3 disabled:opacity-60">
        {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}

/* ============================== TAB 2: PROJECTS ============================== */

const PROJECT_EMPTY = {
  title: "", view_type: "client", category: "Software", tech_stack: "",
  problem_statement: "", solution_delivered: "", thumbnail_url: "", demo_url: "",
};

function ProjectsTab({ push }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) push("error", "Failed to load projects.");
    setRows(data || []);
    setLoading(false);
  }, [push]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    const row = {
      title: form.title.trim(),
      view_type: form.view_type,
      category: form.category,
      tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
      problem_statement: form.problem_statement.trim() || null,
      solution_delivered: form.solution_delivered.trim() || null,
      thumbnail_url: form.thumbnail_url.trim() || null,
      demo_url: form.demo_url.trim() || null,
    };
    const { error } = form.id
      ? await supabase.from("projects").update(row).eq("id", form.id)
      : await supabase.from("projects").insert(row);

    if (error) { push("error", "Could not save the project."); return; }
    push("success", form.id ? "Project updated." : "Project created.");
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { push("error", "Could not delete the project."); return; }
    push("success", "Project deleted.");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold uppercase text-offwhite text-lg">Projects Management</h2>
        <button
          onClick={() => setEditing({ ...PROJECT_EMPTY })}
          className="flex items-center gap-1.5 bg-acid text-void text-xs font-semibold uppercase px-4 py-2"
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-offwhite/65"><Loader2 className="animate-spin" size={22} /></div>
      ) : (
        <div className="border-2 border-zincline overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-zincline text-left text-offwhite/65 uppercase text-xs">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-zincline last:border-b-0 text-offwhite/80">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 normal-case">{p.view_type === "client" ? "Enterprise B2B" : "Student Capstone"}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.category} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <IconBtn icon={Pencil} label="Edit" onClick={() => setEditing({ ...p, tech_stack: (p.tech_stack || []).join(", ") })} />
                      <IconBtn icon={Trash2} label="Delete" danger onClick={() => handleDelete(p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-offwhite/65 normal-case">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit Project" : "New Project"} onClose={() => setEditing(null)}>
          <ProjectForm initial={editing} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
}

function ProjectForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }}
      className="flex flex-col gap-4"
    >
      <AField label="Project Name"><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></AField>
      <AField label="Client Type">
        <select className="admin-input" value={form.view_type} onChange={(e) => setForm({ ...form, view_type: e.target.value })}>
          <option value="client">Enterprise B2B</option>
          <option value="student">Student Capstone</option>
        </select>
      </AField>
      <AField label="Category">
        <select className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option>Software</option><option>Hardware/IoT</option><option>AI &amp; Automation</option><option>Student Innovations</option>
        </select>
      </AField>
      <AField label="Tech Stack (comma-separated)"><input className="admin-input" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Node.js, Supabase" /></AField>
      <AField label="Problem Statement"><textarea rows={2} className="admin-input resize-none" value={form.problem_statement} onChange={(e) => setForm({ ...form, problem_statement: e.target.value })} /></AField>
      <AField label="Short Description / Solution"><textarea rows={3} className="admin-input resize-none" value={form.solution_delivered} onChange={(e) => setForm({ ...form, solution_delivered: e.target.value })} /></AField>
      <AField label="Architecture / Thumbnail Image URL"><input className="admin-input" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} /></AField>
      <AField label="Live Demo Link"><input className="admin-input" value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} /></AField>
      <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 bg-acid text-void text-sm font-semibold uppercase py-3 disabled:opacity-60">
        {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}

/* ============================== TAB 3: TRAINING TRACKS ============================== */

const TRACK_EMPTY = { title: "Software", duration: "12 Weeks", tech_stack: "", fee_or_stipend: "", status: "Open" };

function TracksTab({ push }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("training_tracks").select("*").order("created_at", { ascending: false });
    if (error) push("error", "Failed to load training tracks.");
    setRows(data || []);
    setLoading(false);
  }, [push]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    const row = {
      title: form.title.trim(),
      duration: form.duration.trim(),
      tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
      fee_or_stipend: form.fee_or_stipend.trim() || null,
      status: form.status,
    };
    const { error } = form.id
      ? await supabase.from("training_tracks").update(row).eq("id", form.id)
      : await supabase.from("training_tracks").insert(row);

    if (error) { push("error", "Could not save the training track."); return; }
    push("success", form.id ? "Track updated." : "Track created.");
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("training_tracks").delete().eq("id", id);
    if (error) { push("error", "Could not delete the track."); return; }
    push("success", "Track deleted.");
    load();
  };

  const toggleStatus = async (track) => {
    const next = track.status === "Open" ? "Applications Closed" : "Open";
    const { error } = await supabase.from("training_tracks").update({ status: next }).eq("id", track.id);
    if (error) { push("error", "Could not update status."); return; }
    push("success", `Marked "${track.title}" as ${next}.`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold uppercase text-offwhite text-lg">Training &amp; Internship Tracks</h2>
        <button
          onClick={() => setEditing({ ...TRACK_EMPTY })}
          className="flex items-center gap-1.5 bg-acid text-void text-xs font-semibold uppercase px-4 py-2"
        >
          <Plus size={14} /> New Track
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-offwhite/65"><Loader2 className="animate-spin" size={22} /></div>
      ) : (
        <div className="border-2 border-zincline overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-zincline text-left text-offwhite/65 uppercase text-xs">
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-b border-zincline last:border-b-0 text-offwhite/80">
                  <td className="px-4 py-3">{t.title}</td>
                  <td className="px-4 py-3 normal-case">{t.duration}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(t)}><StatusBadge status={t.status} /></button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <IconBtn icon={Pencil} label="Edit" onClick={() => setEditing({ ...t, tech_stack: (t.tech_stack || []).join(", ") })} />
                      <IconBtn icon={Trash2} label="Delete" danger onClick={() => handleDelete(t.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-offwhite/65 normal-case">No training tracks yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit Track" : "New Track"} onClose={() => setEditing(null)}>
          <TrackForm initial={editing} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
}

function TrackForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }}
      className="flex flex-col gap-4"
    >
      <AField label="Track Title"><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></AField>
      <AField label="Duration"><input className="admin-input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="12 Weeks" /></AField>
      <AField label="Tech Stack Covered (comma-separated)"><input className="admin-input" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Node.js" /></AField>
      <AField label="Fees / Stipend"><input className="admin-input" value={form.fee_or_stipend} onChange={(e) => setForm({ ...form, fee_or_stipend: e.target.value })} placeholder="Paid — ₹15,000/mo" /></AField>
      <AField label="Status">
        <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option>Open</option><option>Applications Closed</option>
        </select>
      </AField>
      <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 bg-acid text-void text-sm font-semibold uppercase py-3 disabled:opacity-60">
        {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save Track"}
      </button>
    </form>
  );
}

/* ============================== TAB 4: LEADS ============================== */

const LEAD_SOURCES = [
  { table: "meetings", label: "Meeting Requests" },
  { table: "partnership_inquiries", label: "Partnership Inquiries" },
  { table: "internship_applications", label: "Internship Applications" },
  { table: "job_applications", label: "Job Applications" },
];

function LeadsTab({ push }) {
  const [source, setSource] = useState("meetings");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (table) => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) push("error", `Failed to load ${table.replace("_", " ")}.`);
    setRows(data || []);
    setLoading(false);
  }, [push]);

  useEffect(() => { load(source); }, [source, load]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold uppercase text-offwhite text-lg">Incoming Leads &amp; Applications</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {LEAD_SOURCES.map((s) => (
          <button
            key={s.table}
            onClick={() => setSource(s.table)}
            className={`px-4 py-2 text-xs font-semibold uppercase border-2 transition-colors ${
              source === s.table ? "bg-acid text-void border-acid" : "bg-void border-zincline text-offwhite/70 hover:border-acid"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-offwhite/65"><Loader2 className="animate-spin" size={22} /></div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-offwhite/65 py-16 text-center normal-case">Nothing here yet.</p>
      ) : (
        <div className="border-2 border-zincline overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-zincline text-left text-offwhite/65 uppercase text-xs">
                {Object.keys(rows[0])
                  .filter((k) => !["id"].includes(k))
                  .map((k) => (
                    <th key={k} className="px-4 py-3 whitespace-nowrap">{k.replace(/_/g, " ")}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-zincline last:border-b-0 text-offwhite/80">
                  {Object.entries(row)
                    .filter(([k]) => !["id"].includes(k))
                    .map(([k, v]) => (
                      <td key={k} className="px-4 py-3 normal-case whitespace-nowrap max-w-[220px] truncate">
                        {Array.isArray(v) ? v.join(", ") : String(v ?? "—")}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ============================== TAB: SERVICE PAGES ============================== */

const ICON_OPTIONS = ["Code2", "Cloud", "Cpu", "Network", "CircuitBoard", "Bot", "GraduationCap"];

const pairsToText = (list, a, b) => (list || []).map((x) => `${x[a]} | ${x[b]}`).join("\n");
const textToPairs = (text, a, b) =>
  String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf("|");
      return i === -1 ? { [a]: l, [b]: "" } : { [a]: l.slice(0, i).trim(), [b]: l.slice(i + 1).trim() };
    });
const textToList = (text) =>
  String(text || "")
    .split(/[\n,]/)
    .map((x) => x.trim())
    .filter(Boolean);

const serviceToForm = (svc) => ({
  slug: svc.slug,
  title: svc.title || "",
  tagline: svc.tagline || "",
  seo_description: svc.seo_description || "",
  icon: svc.icon || "Code2",
  sort_order: svc.sort_order ?? 99,
  intro: svc.intro || "",
  capabilities: pairsToText(svc.capabilities, "title", "description"),
  process: pairsToText(svc.process, "title", "description"),
  tech_stack: (svc.tech_stack || []).join(", "),
  deliverables: (svc.deliverables || []).join("\n"),
  faqs: pairsToText(svc.faqs, "q", "a"),
  related_projects: (svc.related_projects || []).join(", "),
});

const formToServiceRow = (f) => ({
  slug: f.slug,
  title: f.title.trim(),
  tagline: f.tagline.trim() || null,
  seo_description: f.seo_description.trim() || null,
  icon: f.icon,
  sort_order: Number(f.sort_order) || 99,
  intro: f.intro,
  capabilities: textToPairs(f.capabilities, "title", "description"),
  process: textToPairs(f.process, "title", "description"),
  tech_stack: textToList(f.tech_stack),
  deliverables: String(f.deliverables || "").split("\n").map((x) => x.trim()).filter(Boolean),
  faqs: textToPairs(f.faqs, "q", "a"),
  related_projects: textToList(f.related_projects),
  is_placeholder: false, // a human has now reviewed this page
  updated_at: new Date().toISOString(),
});

function ServicesTab({ push }) {
  const [dbRows, setDbRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("service_pages").select("*");
    if (error) { setTableMissing(true); setDbRows([]); }
    else { setTableMissing(false); setDbRows(data || []); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const bySlug = new Map(dbRows.map((r) => [r.slug, r]));
  const list = seedServices.map((seed) => {
    const row = bySlug.get(seed.slug);
    return row ? { ...row, _source: row.is_placeholder ? "placeholder" : "saved" } : { ...seed, _source: "starter" };
  });

  const handleSave = async (form) => {
    const { error } = await supabase.from("service_pages").upsert(formToServiceRow(form), { onConflict: "slug" });
    if (error) { push("error", "Could not save the page. Has supabase/002_cms_content.sql been run?"); return; }
    push("success", "Service page saved — it is live now.");
    setEditing(null);
    load();
  };

  const importStarter = async () => {
    const toAdd = seedServices
      .filter((s) => !bySlug.has(s.slug))
      // eslint-disable-next-line no-unused-vars
      .map(({ __seed, ...rest }) => rest);
    if (toAdd.length === 0) { push("success", "All starter pages are already imported."); return; }
    const { error } = await supabase.from("service_pages").insert(toAdd);
    if (error) { push("error", "Import failed. Has supabase/002_cms_content.sql been run?"); return; }
    push("success", `${toAdd.length} starter pages imported.`);
    load();
  };

  const handleRevert = async (slug) => {
    const { error } = await supabase.from("service_pages").delete().eq("slug", slug);
    if (error) { push("error", "Could not revert this page."); return; }
    push("success", "Reverted to the starter copy.");
    load();
  };

  const badge = (src) =>
    src === "saved" ? (
      <span className="font-hand text-xs px-2.5 py-1 border-2 border-graphite bg-postit text-graphite -rotate-1 inline-block">Saved</span>
    ) : (
      <AiBadge />
    );

  const sourceNote = {
    saved: "Edited and saved in the database",
    placeholder: "In the database, still AI-generated",
    starter: "Showing the built-in AI starter copy (not saved yet)",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold uppercase text-offwhite text-lg">Service Pages</h2>
        <button
          onClick={importStarter}
          className="flex items-center gap-1.5 border-2 border-zincline text-offwhite/80 text-xs font-semibold uppercase px-4 py-2 hover:border-acid hover:text-acid transition-colors"
        >
          <Download size={14} /> Import starter pages
        </button>
      </div>

      {tableMissing && (
        <p className="mb-4 text-sm normal-case border-2 border-correction text-correction p-4">
          The <code>service_pages</code> table was not found. Run <strong>supabase/002_cms_content.sql</strong> in the
          Supabase SQL Editor, then reload this page. Until then the public pages show the built-in starter copy.
        </p>
      )}
      <p className="mb-4 text-sm text-offwhite/70 normal-case border-2 border-zincline p-4">
        Each page below is a public page at <code>/services/&lt;slug&gt;</code>. The text is AI-generated starter copy:
        open a page, replace it with your own wording and save — changes appear on the site immediately.
      </p>

      {loading ? (
        <div className="flex justify-center py-16 text-offwhite/65"><Loader2 className="animate-spin" size={22} /></div>
      ) : (
        <div className="border-2 border-zincline overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-zincline text-left text-offwhite/65 uppercase text-xs">
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((svc) => (
                <tr key={svc.slug} className="border-b border-zincline last:border-b-0 text-offwhite/80">
                  <td className="px-4 py-3">
                    {svc.title}
                    <div className="text-xs text-offwhite/60 normal-case mt-0.5">{sourceNote[svc._source]}</div>
                  </td>
                  <td className="px-4 py-3 normal-case">
                    <a href={`/services/${svc.slug}`} target="_blank" rel="noopener noreferrer" className="text-acid hover:underline">
                      /services/{svc.slug}
                    </a>
                  </td>
                  <td className="px-4 py-3">{badge(svc._source)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <IconBtn icon={Pencil} label="Edit" onClick={() => setEditing(serviceToForm(svc))} />
                      {svc._source !== "starter" && (
                        <IconBtn icon={Trash2} label="Revert to starter copy" danger onClick={() => handleRevert(svc.slug)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={`Edit — ${editing.title}`} onClose={() => setEditing(null)} wide>
          <ServiceForm initial={editing} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
}

function ServiceForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const hint = (t) => <span className="text-[11px] normal-case font-normal text-offwhite/60">{t}</span>;

  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }}
      className="flex flex-col gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <AField label="Title"><input className="admin-input" value={form.title} onChange={set("title")} required /></AField>
        <AField label="Icon">
          <select className="admin-input" value={form.icon} onChange={set("icon")}>
            {ICON_OPTIONS.map((i) => <option key={i}>{i}</option>)}
          </select>
        </AField>
      </div>
      <AField label="Tagline (one line under the title)"><input className="admin-input" value={form.tagline} onChange={set("tagline")} /></AField>
      <AField label="Search-engine description"><textarea rows={2} className="admin-input resize-none" value={form.seo_description} onChange={set("seo_description")} /></AField>
      <AField label="Introduction">
        {hint("Blank line = new paragraph.")}
        <textarea rows={7} className="admin-input resize-y" value={form.intro} onChange={set("intro")} />
      </AField>
      <AField label="What we do (capabilities)">
        {hint("One per line:  Title | Description")}
        <textarea rows={7} className="admin-input resize-y font-mono text-xs" value={form.capabilities} onChange={set("capabilities")} />
      </AField>
      <AField label="How we work (process steps)">
        {hint("One per line, in order:  Step | Description")}
        <textarea rows={5} className="admin-input resize-y font-mono text-xs" value={form.process} onChange={set("process")} />
      </AField>
      <div className="grid sm:grid-cols-2 gap-4">
        <AField label="Tools & technology">
          {hint("Separate with commas.")}
          <textarea rows={3} className="admin-input resize-none" value={form.tech_stack} onChange={set("tech_stack")} />
        </AField>
        <AField label="What you receive">
          {hint("One per line.")}
          <textarea rows={3} className="admin-input resize-none" value={form.deliverables} onChange={set("deliverables")} />
        </AField>
      </div>
      <AField label="Questions & answers (FAQ)">
        {hint("One per line:  Question | Answer")}
        <textarea rows={7} className="admin-input resize-y font-mono text-xs" value={form.faqs} onChange={set("faqs")} />
      </AField>
      <AField label="Related projects">
        {hint(`Comma-separated project ids. Available: ${PROJECTS.map((p) => p.id).join(", ")}`)}
        <input className="admin-input" value={form.related_projects} onChange={set("related_projects")} />
      </AField>
      <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 bg-acid text-void text-sm font-semibold uppercase py-3 disabled:opacity-60">
        {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save page"}
      </button>
    </form>
  );
}

/* ============================== DASHBOARD SHELL ============================== */

const TABS = [
  { key: "blogs", label: "Blogs", icon: FileText, Component: BlogsTab },
  { key: "services", label: "Service Pages", icon: Layers, Component: ServicesTab },
  { key: "projects", label: "Projects", icon: FolderKanban, Component: ProjectsTab },
  { key: "tracks", label: "Training Tracks", icon: GraduationCap, Component: TracksTab },
  { key: "leads", label: "Leads & Applications", icon: Inbox, Component: LeadsTab },
];

function Dashboard({ session, onSignOut }) {
  const [activeTab, setActiveTab] = useState("blogs");
  const { toasts, push } = useToasts();
  const ActiveComponent = TABS.find((t) => t.key === activeTab).Component;

  return (
    <div className="min-h-screen bg-void">
      <header className="border-b-2 border-zincline">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 bg-acid text-void font-display font-bold text-sm">P2N</span>
            <span className="font-display font-semibold text-offwhite uppercase">Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-xs text-offwhite/65 normal-case hidden sm:inline">{session.user.email}</span>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase text-offwhite/70 border-2 border-zincline px-3 py-2 hover:border-correction hover:text-correction transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase border-2 transition-colors ${
                activeTab === key ? "bg-acid text-void border-acid" : "bg-void border-zincline text-offwhite/70 hover:border-acid"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <ActiveComponent push={push} />
      </div>

      <ToastStack toasts={toasts} />

      <style>{`
        .admin-input {
          width: 100%;
          border: 2px solid rgb(var(--c-zincline));
          background: rgb(var(--c-void));
          color: rgb(var(--c-offwhite));
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
        }
        .admin-input:focus {
          outline: none;
          border-color: rgb(var(--c-acid));
        }
      `}</style>
    </div>
  );
}

/* ============================== ROOT: AUTH GATE ============================== */

export default function AdminPortal() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-void grid place-items-center">
        <Loader2 size={28} className="animate-spin text-offwhite/65" />
      </div>
    );
  }

  if (!session) {
    return <LoginScreen onSignedIn={setSession} />;
  }

  return <Dashboard session={session} onSignOut={handleSignOut} />;
}
