import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). " +
      "The site still loads using its built-in content; forms, comments and the admin login need the real keys. " +
      "On Netlify, set them under Site configuration → Environment variables, then redeploy."
  );
}

// Placeholder values stop createClient() from throwing, so a missing key no longer
// blanks the whole site: requests simply fail and pages fall back to starter content.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
