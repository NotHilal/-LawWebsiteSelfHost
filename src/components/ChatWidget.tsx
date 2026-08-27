import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { media } from "../data/media";
import { areasOfInterest } from "../data/siteContent";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hello — I'm the Summit assistant. Ask me about our practice areas or how to book a consultation. I'm not a lawyer and can't give legal advice.",
};

const CONSULTATION_INTENT_KEYWORDS = [
  "consult",
  "book",
  "appointment",
  "schedule",
  "meeting",
  "request",
  "callback",
  "call back",
  "talk to someone",
  "speak to someone",
  "speak with someone",
  "get in touch",
  "reach out",
  "contact your team",
  "contact the team",
  "help",
  "assist",
  "project",
];

// Once the assistant is actually collecting intake details, its own wording is a far
// more reliable signal than guessing intent from however the visitor first phrased it.
const INTAKE_IN_PROGRESS_PHRASES = [
  "full name",
  "your name",
  "email address",
  "what you need help with",
  "what you're looking for help with",
  "brief description",
  "briefly describe",
  "which of our practice areas",
  "area of interest",
  "consultation request",
  "send this to our team",
  "send this consultation request",
];

function hasRequestedConsultation(messages: ChatMessage[]): boolean {
  return messages.some((m) => {
    const text = m.content.toLowerCase();
    if (m.role === "user") {
      return CONSULTATION_INTENT_KEYWORDS.some((keyword) => text.includes(keyword));
    }
    return INTAKE_IN_PROGRESS_PHRASES.some((phrase) => text.includes(phrase));
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  // No reliable way to detect the exact moment the model asks for a category — its
  // phrasing (and even whether it lists the options verbatim) varies too much to
  // pattern-match. Opening as soon as intake starts trades a little earliness for
  // never missing the moment that actually matters.
  useEffect(() => {
    if (hasRequestedConsultation(messages)) {
      setShowPicker(true);
    }
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text || loading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setShowPicker(false);
    setLoading(true);

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.id !== "greeting")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Something went wrong");

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply as string },
      ]);
    } catch {
      setError("Couldn't reach the assistant. Please try again in a moment.");
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
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
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
              <img
                src={media.aiIcon}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-summit-ivory">Summit Assistant</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-summit-mute">
                  General inquiries
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-summit-mute transition-colors hover:bg-summit-graphite hover:text-summit-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <img src={media.aiIcon} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
                  <div className="rounded-xl bg-summit-graphite px-3 py-2 text-sm text-summit-mute">
                    Typing…
                  </div>
                </div>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            {showPicker && (
              <div className="flex flex-wrap gap-2 border-t border-summit-graphite px-3 pb-3 pt-3">
                {areasOfInterest.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => sendMessage(option)}
                    disabled={loading}
                    className="rounded-full border border-summit-gold/60 px-3 py-1.5 text-xs text-summit-ivory transition-colors hover:border-summit-gold hover:bg-summit-gold/10 disabled:opacity-40"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`flex items-center gap-2 p-3 ${showPicker ? "" : "border-t border-summit-graphite"}`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                disabled={loading}
                className="flex-1 rounded-full border border-summit-graphite bg-summit-black px-4 py-2 text-sm text-summit-ivory placeholder:text-summit-mute-dark focus:border-summit-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="rounded-full bg-summit-gold p-2.5 text-summit-black transition-colors hover:bg-summit-gold-soft disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-summit-gold/60 bg-summit-charcoal shadow-lg"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-summit-ivory" />
        ) : (
          <img src={media.aiIcon} alt="Open chat" className="h-full w-full object-cover" />
        )}
      </motion.button>
    </div>
  );
}
