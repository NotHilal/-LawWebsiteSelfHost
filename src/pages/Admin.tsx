import { useEffect, useState, type FormEvent } from "react";
import { Loader2, LogOut, Mail, Phone } from "lucide-react";

type ContactRequest = {
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

const TOKEN_KEY = "summit_admin_token";

function useNoIndex() {
  useEffect(() => {
    document.title = "Admin — Summit Management Consultancy";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}

export default function Admin() {
  useNoIndex();

  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  if (!token) {
    return <LoginView onLogin={(t) => setToken(t)} />;
  }

  return (
    <RequestsView
      token={token}
      onLogout={() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-summit-black px-6 py-32">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-summit-gold">Admin</p>
          <h1 className="mt-3 font-serif text-2xl text-summit-ivory">Client Requests</h1>
        </div>

        <div>
          <label htmlFor="admin-email" className="text-xs uppercase tracking-[0.16em] text-summit-mute">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-0 border-b border-summit-graphite bg-transparent py-3 text-summit-ivory focus:border-summit-gold focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="text-xs uppercase tracking-[0.16em] text-summit-mute">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-0 border-b border-summit-graphite bg-transparent py-3 text-summit-ivory focus:border-summit-gold focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-3 bg-summit-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-summit-black transition-colors duration-300 hover:bg-summit-gold-soft disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading ? "Signing in" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function RequestsView({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function load() {
    setStatus("loading");
    try {
      const res = await fetch("/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setRequests(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleRead(req: ContactRequest) {
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, read: !r.read } : r)));
    await fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: req.id, read: !req.read }),
    });
  }

  return (
    <div className="min-h-screen bg-summit-black px-6 py-28 sm:px-10 sm:py-32 lg:px-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-summit-gold">Admin</p>
            <h1 className="mt-3 font-serif text-2xl text-summit-ivory">Client Requests</h1>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-summit-mute transition-colors hover:text-summit-gold"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log Out
          </button>
        </div>

        <div className="mt-12 space-y-4">
          {status === "loading" && <p className="text-sm text-summit-mute">Loading…</p>}
          {status === "error" && <p className="text-sm text-red-400">Couldn&rsquo;t load requests.</p>}
          {status === "ready" && requests.length === 0 && (
            <p className="text-sm text-summit-mute">No requests yet.</p>
          )}

          {requests.map((req) => (
            <div
              key={req.id}
              className={`border px-6 py-5 transition-colors ${
                req.read ? "border-summit-graphite" : "border-summit-gold/40 bg-summit-gold/5"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-lg text-summit-ivory">
                    {req.name}
                    {req.title && <span className="text-summit-mute">, {req.title}</span>}
                  </p>
                  {req.organization && <p className="text-sm text-summit-mute">{req.organization}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-summit-mute-dark">
                    {new Date(req.created_at).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRead(req)}
                    className="border border-summit-graphite px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-summit-mute transition-colors hover:border-summit-gold hover:text-summit-gold"
                  >
                    {req.read ? "Mark unread" : "Mark read"}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-summit-ivory/80">
                <a href={`mailto:${req.email}`} className="flex items-center gap-2 hover:text-summit-gold">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {req.email}
                </a>
                {req.phone && (
                  <a href={`tel:${req.phone}`} className="flex items-center gap-2 hover:text-summit-gold">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {req.phone}
                  </a>
                )}
                {req.interest && (
                  <span className="text-summit-mute-dark">{req.interest}</span>
                )}
              </div>

              <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-summit-ivory/70">
                {req.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
