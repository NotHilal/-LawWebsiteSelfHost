import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { sendRequestNotification } from "./email.js";

// Local SQLite file via Node's built-in node:sqlite — no external account,
// nothing that can be deleted for inactivity, and no separate native binary
// to mismatch against the host's glibc (unlike better-sqlite3's prebuilds).
// Lives outside dist/ and server-dist/ so `npm run build` and redeploys
// never touch it. Override with DATA_DIR to point at a different location.
const dataDir = process.env.DATA_DIR || path.resolve(process.cwd(), "data");
const dbPath = path.join(dataDir, "requests.db");

let client: DatabaseSync | null = null;

function db(): DatabaseSync {
  if (!client) {
    fs.mkdirSync(dataDir, { recursive: true });
    client = new DatabaseSync(dbPath);
    client.exec(`
      create table if not exists requests (
        id text primary key,
        type text not null default 'consultation',
        name text not null,
        organization text,
        title text,
        email text not null,
        phone text,
        interest text,
        message text not null,
        read integer not null default 0,
        created_at text not null
      )
    `);
  }
  return client;
}

export type RequestType = "consultation" | "question";

export type ContactRequest = {
  id: string;
  type: RequestType;
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

type RequestRow = Omit<ContactRequest, "read"> & { read: number };

export async function insertRequest(data: {
  id: string;
  type: RequestType;
  name: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at: string;
}) {
  db()
    .prepare(
      `insert into requests
        (id, type, name, organization, title, email, phone, interest, message, created_at)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      data.id,
      data.type,
      data.name,
      data.organization || null,
      data.title || null,
      data.email,
      data.phone || null,
      data.interest || null,
      data.message,
      data.created_at,
    );

  // Notify by email. Awaited so failures are logged in order, but
  // sendRequestNotification never throws — a mail failure must not fail the
  // submission, which is already safely persisted above.
  await sendRequestNotification({
    type: data.type,
    name: data.name,
    organization: data.organization,
    title: data.title,
    email: data.email,
    phone: data.phone,
    interest: data.interest,
    message: data.message,
    created_at: data.created_at,
  });
}

export async function listRequests(): Promise<ContactRequest[]> {
  const rows = db().prepare(`select * from requests order by created_at desc`).all() as unknown as RequestRow[];
  return rows.map((r) => ({ ...r, read: !!r.read }));
}

export async function markRequestRead(id: string, read: boolean) {
  db().prepare(`update requests set read = ? where id = ?`).run(read ? 1 : 0, id);
}

export async function deleteRequest(id: string) {
  db().prepare(`delete from requests where id = ?`).run(id);
}
