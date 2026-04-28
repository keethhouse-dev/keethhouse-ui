"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

const INTRO: Message = {
  role: "assistant",
  content:
    "Hello, I'm the Keeth House assistant. Ask me about our cottages, location, amenities, or how to book a stay.",
}

const SUGGESTIONS = [
  "What are the check-in and check-out times?",
  "Which house has a private pool?",
  "How can I book a stay?",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INTRO])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading, open])

  if (!apiUrl) return null

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setError(null)
    const next: Message[] = [...messages, { role: "user", content: trimmed }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== INTRO).map(({ role, content }) => ({ role, content })),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { reply?: string }
      const reply = data.reply?.trim()
      if (!reply) throw new Error("Empty reply")
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch (e) {
      console.error(e)
      setError("Something went wrong. Please try again, or reach us on WhatsApp at +91 8124338124.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed z-[60] bottom-5 right-5 md:bottom-7 md:right-7",
          "h-14 w-14 rounded-full shadow-[0_12px_28px_-10px_rgba(29,25,20,0.45)]",
          "flex items-center justify-center transition-transform duration-200 hover:scale-105",
          "bg-primary text-white",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "msg"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[59] bg-white border border-[var(--story-ink)]/12",
              "shadow-[0_24px_60px_-20px_rgba(29,25,20,0.35)]",
              "flex flex-col overflow-hidden",
              "bottom-24 right-5 md:right-7",
              "w-[calc(100vw-2.5rem)] max-w-[380px] h-[min(560px,calc(100vh-7rem))]",
            )}
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b border-[var(--story-ink)]/10"
              style={{ backgroundColor: "#faf4e4" }}
            >
              <p
                className="uppercase text-[var(--story-ink)]/70"
                style={{ letterSpacing: "0.32em", fontSize: "10px", fontWeight: 600 }}
              >
                Keeth House
              </p>
              <h2
                className="text-[var(--story-ink)] mt-1"
                style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.005em" }}
              >
                Ask the host
              </h2>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[1.6] whitespace-pre-line",
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "bg-[var(--story-ink)]/5 text-[var(--story-ink)]",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--story-ink)]/5 text-[var(--story-ink)]/70 px-3.5 py-2.5 inline-flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[12px]">Typing…</span>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-[12px] leading-[1.5] text-red-700/90 bg-red-50 px-3 py-2">
                  {error}
                </p>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <p
                    className="uppercase text-[var(--story-ink)]/55"
                    style={{ letterSpacing: "0.28em", fontSize: "10px", fontWeight: 500 }}
                  >
                    Try asking
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="text-left text-[12.5px] leading-[1.5] text-[var(--story-ink)]/85 border border-[var(--story-ink)]/15 px-3 py-2 hover:border-primary hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[var(--story-ink)]/10 px-3 py-3 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask about a house, booking, location…"
                  className="flex-1 resize-none px-3 py-2 text-[13px] leading-[1.5] bg-[var(--story-ink)]/[0.04] focus:bg-white border border-transparent focus:border-[var(--story-ink)]/20 outline-none transition-colors max-h-32"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className={cn(
                    "h-9 w-9 flex items-center justify-center bg-primary text-white",
                    "disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors",
                  )}
                >
                  <Send size={15} />
                </button>
              </div>
              <p
                className="mt-2 text-[10px] text-[var(--story-ink)]/55"
                style={{ letterSpacing: "0.04em" }}
              >
                Replies are AI-generated. For bookings, please confirm with our team.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
