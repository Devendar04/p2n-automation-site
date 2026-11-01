import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BLOG_POSTS, SERVICE_PAGES } from "../data/aiContent";

/**
 * Content loaders for the Blog and the Service pages.
 *
 *  - Database first (tables `blogs`, `service_pages`, managed in /admin).
 *  - If the database is unreachable or still empty, the AI-generated starter
 *    content in src/data/aiContent.js is shown instead, so the site is never blank.
 *  - Seed rows carry `__seed: true`; features that need a real database row
 *    (likes, comments) are switched off for them.
 */

export const seedBlogs = BLOG_POSTS.map((p) => ({
  ...p,
  id: `seed-${p.slug}`,
  like_count: 0,
  cover_image_url: null,
  __seed: true,
}));

export const seedServices = SERVICE_PAGES.map((s) => ({ ...s, __seed: true }));

const arr = (v) => (Array.isArray(v) ? v : []);

/** jsonb / array columns can arrive null from the database — make them safe. */
export function normalizeService(row) {
  return {
    ...row,
    capabilities: arr(row.capabilities),
    process: arr(row.process),
    tech_stack: arr(row.tech_stack),
    deliverables: arr(row.deliverables),
    faqs: arr(row.faqs),
    related_projects: arr(row.related_projects),
  };
}

async function loadBlogs() {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });
    if (error || !data || data.length === 0) return seedBlogs;
    return data;
  } catch {
    return seedBlogs;
  }
}

async function loadServices() {
  let rows = [];
  try {
    const { data, error } = await supabase.from("service_pages").select("*");
    if (!error && data) rows = data;
  } catch {
    /* fall through to seed */
  }
  const bySlug = new Map(rows.map((r) => [r.slug, normalizeService(r)]));
  // A page edited in the admin wins; any page not yet in the database falls back to the starter copy.
  const merged = seedServices.map((s) => bySlug.get(s.slug) ?? s);
  rows.forEach((r) => {
    if (!seedServices.some((s) => s.slug === r.slug)) merged.push(normalizeService(r));
  });
  return merged.sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99));
}

function useLoaded(loader) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    loader().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, [loader]);
  return data;
}

export function useBlogs() {
  const blogs = useLoaded(loadBlogs);
  return { blogs: blogs ?? [], loading: blogs === null };
}

export function useBlog(slug) {
  const blogs = useLoaded(loadBlogs);
  return {
    blog: blogs?.find((b) => b.slug === slug) ?? null,
    others: (blogs ?? []).filter((b) => b.slug !== slug).slice(0, 2),
    loading: blogs === null,
  };
}

export function useServices() {
  const services = useLoaded(loadServices);
  return { services: services ?? [], loading: services === null };
}

export function useService(slug) {
  const services = useLoaded(loadServices);
  return {
    service: services?.find((s) => s.slug === slug) ?? null,
    all: services ?? [],
    loading: services === null,
  };
}
