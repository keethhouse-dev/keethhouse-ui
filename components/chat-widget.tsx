"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

const INTRO: Message = {
  role: "assistant",
  content:
    "A warm welcome. Ask me about our houses, the land, food, or how to plan your stay — I'm here to help.",
}

const SUGGESTIONS: string[] = [
  "How can I book a stay?",
  "What are the check-in and check-out times?",
  "Which house has a private pool?",
  "Which house is best for a family of four?",
  "Tell me about The Khaya Nest",
  "How do I get there from Pondicherry?",
  "What is the cancellation policy?",
  "Are pets allowed?",
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
    if (!open) return
    if (typeof window === "undefined") return
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (!isMobile) inputRef.current?.focus()
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
          "h-14 w-14 rounded-full",
          "ring-1 ring-[var(--story-ink)]/12",
          "shadow-[0_18px_44px_-16px_rgba(29,25,20,0.45)]",
          "flex items-center justify-center transition-transform duration-200",
          "hover:scale-105 active:scale-95",
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
            {open ? <X size={22} strokeWidth={1.75} /> : <MessageCircle size={24} strokeWidth={1.6} />}
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
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[59]",
              "bottom-24 right-5 md:right-7",
              "w-[calc(100vw-2.5rem)] max-w-[400px]",
              "h-[min(620px,calc(100dvh-7rem))]",
              "flex flex-col overflow-hidden",
              "border border-[var(--story-ink)]/12",
              "shadow-[0_28px_72px_-22px_rgba(29,25,20,0.4)]",
            )}
            style={{ backgroundColor: "#faf4e4" }}
            role="dialog"
            aria-label="Keeth House chat"
          >
            {/* Header */}
            <div className="bg-white border-b border-[var(--story-ink)]/10 px-5 pt-5 pb-4 text-center">
              <p
                className="uppercase text-[var(--story-ink)]/65"
                style={{ letterSpacing: "0.32em", fontSize: "10px", fontWeight: 600 }}
              >
                Keeth House
              </p>
              <h2
                className="text-[var(--story-ink)] mt-1.5"
                style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "0.005em" }}
              >
                Ask the Host
              </h2>
              <div aria-hidden className="h-px bg-[var(--story-ink)]/15 w-8 mx-auto mt-3" />
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-5">
                {messages.map((m, i) => (
                  <MessageBlock key={i} message={m} />
                ))}

                {loading && <TypingDots />}

                {error && (
                  <div
                    className="text-[12px] leading-[1.55] px-3 py-2.5 border-l"
                    style={{
                      backgroundColor: "rgba(180, 50, 40, 0.06)",
                      borderColor: "var(--story-terra)",
                      color: "var(--story-ink)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {messages.length === 1 && !loading && !error && <Suggestions onPick={send} />}
              </div>
            </div>

            {/* Input */}
            <div className="bg-white border-t border-[var(--story-ink)]/10">
              <div className="flex items-end gap-2 p-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask about a house, booking, or your stay…"
                  className={cn(
                    "flex-1 resize-none px-3 py-2.5",
                    "text-[13px] leading-[1.55] text-[var(--story-ink)]",
                    "bg-[var(--story-ink)]/[0.04] focus:bg-white",
                    "border border-transparent focus:border-[var(--story-ink)]/25",
                    "outline-none transition-colors max-h-32",
                    "placeholder:text-[var(--story-ink)]/45",
                  )}
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className={cn(
                    "h-10 w-10 flex items-center justify-center bg-primary text-white",
                    "disabled:opacity-35 disabled:cursor-not-allowed",
                    "hover:bg-primary/90 transition-colors",
                  )}
                >
                  <Send size={15} strokeWidth={1.85} />
                </button>
              </div>
              <p
                className="px-4 pb-3 italic text-[var(--story-ink)]/55"
                style={{ fontSize: "10.5px", lineHeight: 1.55, letterSpacing: "0.01em" }}
              >
                Replies are AI-generated. Confirm bookings on{" "}
                <a
                  href="https://keethhouse.in"
                  target="_blank"
                  rel="noreferrer"
                  className="not-italic underline decoration-[var(--story-ink)]/30 underline-offset-2 hover:text-primary hover:decoration-primary"
                >
                  keethhouse.in
                </a>{" "}
                or with our team.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const INLINE_PATTERN =
  /(\*\*[^*\n]+\*\*)|(\[[^\]\n]+\]\([^)\s]+\))|(\bhttps?:\/\/[^\s<>"')\]]+)/g

function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  INLINE_PATTERN.lastIndex = 0

  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    }
    if (match[1]) {
      parts.push(
        <strong key={key++} className="font-semibold text-[var(--story-ink)]">
          {match[1].slice(2, -2)}
        </strong>,
      )
    } else if (match[2]) {
      const m = match[2].match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (m) {
        parts.push(
          <a
            key={key++}
            href={m[2]}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--story-ink)] underline decoration-[var(--story-moss)] decoration-1 underline-offset-[3px] hover:text-[var(--story-moss)] transition-colors"
          >
            {m[1]}
          </a>,
        )
      }
    } else if (match[3]) {
      parts.push(
        <a
          key={key++}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--story-ink)] underline decoration-[var(--story-moss)] decoration-1 underline-offset-[3px] hover:text-[var(--story-moss)] break-all transition-colors"
        >
          {match[3]}
        </a>,
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }
  return parts
}

function HostMarkdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/)
  return (
    <div className="space-y-2.5">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
        if (lines.length === 0) return null

        const allBullets = lines.every((l) => /^[-*•]\s+/.test(l))
        if (allBullets) {
          return (
            <ul key={bi} className="space-y-1.5">
              {lines.map((l, li) => (
                <li key={li} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="inline-block w-2 h-px shrink-0 mt-[10px]"
                    style={{ backgroundColor: "var(--story-moss)" }}
                  />
                  <span className="flex-1">{renderInline(l.replace(/^[-*•]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          )
        }

        const allNumbered = lines.every((l) => /^\d+[.)]\s+/.test(l))
        if (allNumbered) {
          return (
            <ol key={bi} className="space-y-1.5">
              {lines.map((l, li) => {
                const m = l.match(/^(\d+)[.)]\s+(.*)$/)
                return (
                  <li key={li} className="flex items-start gap-2.5">
                    <span
                      className="shrink-0 text-[var(--story-moss)] font-semibold"
                      style={{ fontSize: "11px", letterSpacing: "0.04em", lineHeight: "1.7" }}
                    >
                      {(m ? m[1] : String(li + 1)).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{renderInline(m ? m[2] : l)}</span>
                  </li>
                )
              })}
            </ol>
          )
        }

        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}

function MessageBlock({ message }: { message: Message }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <span
        className={cn(
          "uppercase mb-1.5",
          isUser ? "text-[var(--story-ink)]/55" : "text-[var(--story-moss)]",
        )}
        style={{ letterSpacing: "0.3em", fontSize: "9px", fontWeight: 600 }}
      >
        {isUser ? "You" : "Host"}
      </span>
      {isUser ? (
        <div
          className={cn(
            "max-w-[88%] px-3.5 py-2.5",
            "bg-[var(--story-ink)] text-white",
            "text-[13px] leading-[1.6] whitespace-pre-line",
          )}
        >
          {message.content}
        </div>
      ) : (
        <div
          className={cn(
            "max-w-[94%] pl-3 border-l",
            "text-[var(--story-ink)] text-[13px] leading-[1.65]",
          )}
          style={{ borderColor: "var(--story-moss)" }}
        >
          <HostMarkdown text={message.content} />
        </div>
      )}
    </div>
  )
}

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start"
    >
      <span
        className="uppercase mb-1.5 text-[var(--story-moss)]"
        style={{ letterSpacing: "0.3em", fontSize: "9px", fontWeight: 600 }}
      >
        Host
      </span>
      <div
        className="pl-3 border-l inline-flex items-center gap-2.5 py-1"
        style={{ borderColor: "var(--story-moss)" }}
      >
        <span
          className="italic text-[var(--story-ink)]/75"
          style={{ fontSize: "12.5px", lineHeight: "1.5", letterSpacing: "0.005em" }}
        >
          composing a reply
        </span>
        <span className="inline-flex items-end gap-[3px] pb-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-[5px] h-[5px] rounded-full"
              style={{ backgroundColor: "var(--story-moss)" }}
              animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
              transition={{
                duration: 1.05,
                repeat: Infinity,
                delay: i * 0.16,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      </div>
      <span
        aria-hidden
        className="block h-px w-32 mt-2 ml-3 overflow-hidden"
        style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
      >
        <motion.span
          className="block h-full"
          style={{
            backgroundColor: "var(--story-moss)",
            transformOrigin: "left center",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  )
}

function Suggestions({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden className="inline-block w-4 h-px bg-[var(--story-moss)]" />
        <p
          className="uppercase text-[var(--story-moss)]"
          style={{ letterSpacing: "0.32em", fontSize: "10px", fontWeight: 600 }}
        >
          Try asking
        </p>
      </div>
      <ul className="space-y-1.5">
        {SUGGESTIONS.map((s, i) => (
          <li key={s}>
            <motion.button
              type="button"
              onClick={() => onPick(s)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group/sug w-full flex items-center justify-between gap-3",
                "px-3.5 py-2.5 text-left bg-white",
                "border border-[var(--story-ink)]/15",
                "shadow-[0_1px_0_0_rgba(29,25,20,0.04)]",
                "hover:border-[var(--story-moss)] hover:bg-[#fcfaf2]",
                "focus-visible:outline-none focus-visible:border-[var(--story-moss)]",
                "focus-visible:ring-1 focus-visible:ring-[var(--story-moss)]/30",
                "transition-colors duration-200",
              )}
              style={{ fontWeight: 500 }}
            >
              <span
                className="text-[12.5px] leading-[1.45] text-[var(--story-ink)]/90 group-hover/sug:text-[var(--story-moss)] transition-colors"
              >
                {s}
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                className={cn(
                  "shrink-0 text-[var(--story-ink)]/35",
                  "group-hover/sug:text-[var(--story-moss)]",
                  "transform transition-transform duration-200",
                  "group-hover/sug:translate-x-[1px] group-hover/sug:-translate-y-[1px]",
                )}
              />
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  )
}
