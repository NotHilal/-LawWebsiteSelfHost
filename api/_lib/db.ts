import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Uses the service_role key, so it always talks to Postgres directly and
// bypasses Row Level Security — safe here because this file only ever runs
// server-side inside /api functions, never in the browser bundle. Never
// import this from anything under src/.
let client: SupabaseClient | null = null;

function db(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured");
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

export type ContactRequest = {
  id: string;
  name: string;
  organization: string | null;
  title: string | null;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export async function insertRequest(data: {
  id: string;
  name: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at: string;
}) {
  const { error } = await db()
    .from("requests")
    .insert({
      id: data.id,
      name: data.name,
      organization: data.organization || null,
      title: data.title || null,
      email: data.email,
      phone: data.phone || null,
      interest: data.interest || null,
      message: data.message,
      created_at: data.created_at,
    });
  if (error) throw error;
}

export async function listRequests(): Promise<ContactRequest[]> {
  const { data, error } = await db()
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactRequest[];
}

export async function markRequestRead(id: string, read: boolean) {
  const { error } = await db().from("requests").update({ read }).eq("id", id);
  if (error) throw error;
}
