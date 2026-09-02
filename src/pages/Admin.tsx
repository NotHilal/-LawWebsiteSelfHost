import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import { media } from "../data/media";
import { useContent } from "../i18n/useContent";
import type { SiteContent } from "../i18n";

type AdminStrings = SiteContent["ui"]["admin"];

type RequestType = "consultation" | "question";

type ContactRequest = {
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

function relativeTime(iso: string, justNow: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return justNow;
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function Admin() {
  useNoIndex();
  const { ui } = useContent();
  const t = ui.admin;

  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));

  if (!token) {
    return <LoginView t={t} onLogin={(next) => setToken(next)} />;
  }

  return (
    <RequestsView
      t={t}
      token={token}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

function LoginView({ t, onLogin }: { t: AdminStrings; onLogin: (token: string) => void }) {
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) {
        throw new Error(data.message || `${t.loginFailed} (${res.status})`);
      }
      sessionStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.loginFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-summit-black px-6 py-32">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-summit-mute transition-colors hover:text-summit-gold"
      >
        <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        {t.backToHome}
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-summit-graphite bg-summit-charcoal px-8 py-10 shadow-[0_0_60px_-15px_rgba(201,154,89,0.15)]"
      >
        <div className="flex flex-col items-center text-center">
          <img src={media.emblem} alt="" role="presentation" className="h-10 w-auto opacity-90" />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-summit-gold">{t.label}</p>
          <h1 className="mt-2 font-serif text-2xl text-summit-ivory">{t.loginTitle}</h1>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-xs uppercase tracking-[0.16em] text-summit-mute">
              {t.email}
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
              {t.password}
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
            {loading ? t.signingIn : t.signIn}
          </button>
        </div>
      </form>
    </div>
  );
}

type Filter = "all" | "unread";

function RequestsView({
  t,
  token,
  onLogout,
}: {
  t: AdminStrings;
  token: string;
  onLogout: () => void;
}) {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [tab, setTab] = useState<RequestType>("consultation");
  const [deleting, setDeleting] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<ContactRequest | null>(null);

  const tabs: { value: RequestType; label: string }[] = [
    { value: "consultation", label: t.tabRequests },
    { value: "question", label: t.tabQuestions },
  ];

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

  const tabRequests = useMemo(() => requests.filter((r) => r.type === tab), [requests, tab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tabRequests.filter((r) => {
      if (filter === "unread" && r.read) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.organization ?? "").toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [tabRequests, query, filter]);

  const selected = requests.find((r) => r.id === selectedId) ?? null;
  const unreadCount = tabRequests.filter((r) => !r.read).length;

  function switchTab(next: RequestType) {
    setTab(next);
    setSelectedId(null);
  }

  async function toggleRead(req: ContactRequest) {
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, read: !r.read } : r)));
    await fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: req.id, read: !req.read }),
    });
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const req = confirmTarget;
    setDeleting(true);
    try {
      await fetch("/api/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: req.id }),
      });
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
      setSelectedId(null);
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  }

  function openRequest(req: ContactRequest) {
    setSelectedId(req.id);
    if (!req.read) toggleRead(req);
  }

  return (
    <div className="flex min-h-screen flex-col bg-summit-black">
      <header className="flex flex-none flex-wrap items-center justify-between gap-4 border-b border-summit-graphite px-6 py-5 sm:px-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-summit-mute transition-colors hover:text-summit-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
            {t.backToHome}
          </Link>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-summit-gold">{t.label}</p>
          <h1 className="mt-1 font-serif text-xl text-summit-ivory">
            {tab === "consultation" ? t.requestsTitle : t.questionsTitle}
            {status === "ready" && (
              <span className="mx-3 align-middle text-sm font-sans text-summit-mute">
                {tabRequests.length} {t.total}
                {unreadCount > 0 && ` · ${unreadCount} ${t.unread}`}
              </span>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.value}
                type="button"
                onClick={() => switchTab(tabItem.value)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                  tab === tabItem.value
                    ? "border-summit-gold text-summit-gold"
                    : "border-summit-graphite text-summit-mute hover:text-summit-ivory"
                }`}
              >
                {tabItem.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-summit-mute transition-colors hover:text-summit-gold"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {t.logOut}
          </button>
        </div>
      </header>

      {status === "loading" && (
        <div className="flex flex-1 items-center justify-center text-sm text-summit-mute">
          <Loader2 className="mx-3 h-4 w-4 animate-spin" aria-hidden="true" />
          {t.loading}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 items-center justify-center text-sm text-red-400">{t.loadError}</div>
      )}

      {status === "ready" && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[380px_1fr]">
          {/* List column */}
          <div
            className={`flex flex-col border-summit-graphite lg:border-e ${
              selected ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex-none space-y-3 border-b border-summit-graphite p-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-summit-mute-dark"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full border border-summit-graphite bg-transparent py-2 ps-9 pe-3 text-sm text-summit-ivory placeholder:text-summit-mute-dark focus:border-summit-gold focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "unread"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] transition-colors ${
                      filter === f
                        ? "border-summit-gold text-summit-gold"
                        : "border-summit-graphite text-summit-mute hover:text-summit-ivory"
                    }`}
                  >
                    {f === "all" ? t.filterAll : `${t.filterUnread}${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="flex flex-col items-center gap-3 px-6 py-16 text-center text-summit-mute">
                  <Inbox className="h-8 w-8 text-summit-mute-dark" aria-hidden="true" />
                  <p className="text-sm">
                    {tabRequests.length === 0
                      ? tab === "consultation"
                        ? t.noRequests
                        : t.noQuestions
                      : t.noMatches}
                  </p>
                </div>
              )}
              {filtered.map((req) => (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => openRequest(req)}
                  className={`block w-full border-b border-summit-graphite px-5 py-4 text-start transition-colors hover:bg-summit-charcoal ${
                    selectedId === req.id ? "bg-summit-charcoal" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2">
                      {!req.read && <span className="h-1.5 w-1.5 flex-none rounded-full bg-summit-gold" aria-hidden="true" />}
                      <span className={`truncate font-serif text-base ${req.read ? "text-summit-ivory/80" : "text-summit-ivory"}`}>
                        {req.name || req.email}
                      </span>
                    </span>
                    <span className="flex-none text-[0.65rem] text-summit-mute-dark">
                      {relativeTime(req.created_at, t.justNow)}
                    </span>
                  </div>
                  {req.organization && (
                    <p className="mt-0.5 truncate text-xs text-summit-mute">{req.organization}</p>
                  )}
                  <p className="mt-1.5 truncate text-xs text-summit-mute-dark">{req.message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Detail column */}
          <div className={`flex-col ${selected ? "flex" : "hidden lg:flex"}`}>
            {!selected && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-summit-mute-dark">
                <Inbox className="h-10 w-10" aria-hidden="true" />
                <p className="text-sm">{t.selectPrompt}</p>
              </div>
            )}

            {selected && (
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-summit-mute hover:text-summit-gold lg:hidden"
                >
                  <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                  {t.back}
                </button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl text-summit-ivory">
                      {selected.name || selected.email}
                      {selected.title && <span className="text-summit-mute">, {selected.title}</span>}
                    </h2>
                    {selected.organization && <p className="mt-1 text-sm text-summit-mute">{selected.organization}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleRead(selected)}
                      className="border border-summit-graphite px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-summit-mute transition-colors hover:border-summit-gold hover:text-summit-gold"
                    >
                      {selected.read ? t.markUnread : t.markRead}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmTarget(selected)}
                      disabled={deleting}
                      aria-label={t.deleteRequest}
                      className="border border-summit-graphite p-2 text-summit-mute transition-colors hover:border-red-400/60 hover:text-red-400 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-xs text-summit-mute-dark">
                  {new Date(selected.created_at).toLocaleString(undefined, {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-summit-graphite py-4 text-sm text-summit-ivory/80">
                  <a href={`mailto:${selected.email}`} dir="ltr" className="flex items-center gap-2 hover:text-summit-gold">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {selected.email}
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} dir="ltr" className="flex items-center gap-2 hover:text-summit-gold">
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {selected.phone}
                    </a>
                  )}
                  {selected.interest && (
                    <span className="border border-summit-graphite px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-summit-mute">
                      {selected.interest}
                    </span>
                  )}
                </div>

                <p className="mt-6 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-summit-ivory/85">
                  {selected.message}
                </p>

                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: your enquiry to Summit Management Consultancy`)}`}
                  className="mt-8 inline-flex items-center gap-3 bg-summit-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-summit-black transition-colors duration-300 hover:bg-summit-gold-soft"
                >
                  {t.replyByEmail}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {confirmTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-6"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            onClick={() => !deleting && setConfirmTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm border border-summit-graphite bg-summit-charcoal px-8 py-8 shadow-[0_0_60px_-15px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertTriangle className="h-8 w-8 text-red-400" aria-hidden="true" />
              <h2 id="delete-confirm-title" className="mt-4 font-serif text-xl text-summit-ivory">
                {confirmTarget.type === "question" ? t.deleteConfirmQuestion : t.deleteConfirmRequest}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-summit-mute">
                {t.deleteFrom}{" "}
                <span className="text-summit-ivory/85">{confirmTarget.name || confirmTarget.email}</span>.{" "}
                {t.deleteIrreversible}
              </p>
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmTarget(null)}
                  disabled={deleting}
                  className="border border-summit-graphite px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-summit-mute transition-colors hover:text-summit-ivory disabled:opacity-50"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 bg-red-500/90 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-500 disabled:opacity-50"
                >
                  {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                  {deleting ? t.deleting : t.delete}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
