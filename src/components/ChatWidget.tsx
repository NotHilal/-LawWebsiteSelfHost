import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { media } from "../data/media";
import { useContent, useLang } from "../i18n/useContent";

const ASK_QUESTION_PATH = "/ask-a-question";

// The model is instructed to include the bare path (never markdown link syntax)
// when it can't answer something, so the visitor gets an actual clickable link
// rather than a dead string of text.
function renderMessageContent(content: string, linkLabel: string): ReactNode {
  if (!content.includes(ASK_QUESTION_PATH)) return content;
  const parts = content.split(ASK_QUESTION_PATH);
  const nodes: ReactNode[] = [parts[0]];
  for (let i = 1; i < parts.length; i++) {
    nodes.push(
      <Link
        key={i}
        to={ASK_QUESTION_PATH}
        className="font-medium text-summit-gold underline decoration-summit-gold/50 underline-offset-2 hover:text-summit-gold-soft"
      >
        {linkLabel}
      </Link>,
    );
    nodes.push(parts[i]);
  }
  return nodes;
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// crypto.randomUUID() only exists in secure contexts (HTTPS / localhost).
// Fall back to a plain random id so the widget still works over plain HTTP.
function uid(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatWidget() {
  const { ui, areasOfInterest } = useContent();
  const { lang } = useLang();
  const t = ui.chat;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen, showPicker]);

  // The input is disabled while loading, so refocus once it's enabled again rather
  // than right after sending — focusing a disabled field is a no-op.
  useEffect(() => {
    if (!loading && isOpen) {
      inputRef.current?.focus();
    }
  }, [loading, isOpen]);

  async function sendMessage(text: string) {
    if (!text || loading) return;

    const userMessage: ChatMessage = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setShowPicker(false);
    setLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Something went wrong");

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: data.reply as string },
      ]);
      // The server explicitly signals when to show the picker — via the model's own
      // function call — rather than the client guessing from the reply's wording.
      setShowPicker(data.showCategoryPicker === true);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    await sendMessage(text);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end rtl:right-auto rtl:left-6 rtl:items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-summit-graphite bg-summit-charcoal shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-summit-graphite px-4 py-3">
              <img src={media.aiIcon} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-summit-ivory">{t.title}</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-summit-mute">{t.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t.closeAria}
                className="rounded-full p-1.5 text-summit-mute transition-colors hover:bg-summit-graphite hover:text-summit-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="flex items-end gap-2 justify-start">
                <img src={media.aiIcon} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
                <div className="max-w-[80%] whitespace-pre-wrap rounded-xl bg-summit-graphite px-3 py-2 text-sm leading-relaxed text-summit-ivory">
                  {t.greeting}
                </div>
              </div>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <img src={media.aiIcon} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
                  )}
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-summit-gold text-summit-black"
                        : "bg-summit-graphite text-summit-ivory"
                    }`}
                  >
                    {renderMessageContent(m.content, t.askQuestionLink)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <img src={media.aiIcon} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
                  <div className="rounded-xl bg-summit-graphite px-3 py-2 text-sm text-summit-mute">
                    {t.typing}
                  </div>
                </div>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            {showPicker && (
              <div className="border-t border-summit-graphite px-3 pb-3 pt-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-summit-mute">
                    {t.pickerPrompt}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPicker(false)}
                    aria-label={t.dismissOptionsAria}
                    className="shrink-0 rounded-full p-1 text-summit-mute transition-colors hover:bg-summit-graphite hover:text-summit-ivory"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {areasOfInterest.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => sendMessage(option.label)}
                      disabled={loading}
                      className="rounded-full border border-summit-gold/60 px-3 py-1.5 text-xs text-summit-ivory transition-colors hover:border-summit-gold hover:bg-summit-gold/10 disabled:opacity-40"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`flex items-center gap-2 p-3 ${showPicker ? "" : "border-t border-summit-graphite"}`}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={loading}
                className="flex-1 rounded-full border border-summit-graphite bg-summit-black px-4 py-2 text-sm text-summit-ivory placeholder:text-summit-mute-dark focus:border-summit-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label={t.sendAria}
                className="rounded-full bg-summit-gold p-2.5 text-summit-black transition-colors hover:bg-summit-gold-soft disabled:opacity-40"
              >
                <Send className="h-4 w-4 rtl:-scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? t.closeAria : t.openAria}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-summit-gold/60 bg-summit-charcoal shadow-lg"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-summit-ivory" />
        ) : (
          <img src={media.aiIcon} alt={t.openAria} className="h-full w-full object-cover" />
        )}
      </motion.button>
    </div>
  );
}
