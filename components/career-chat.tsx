"use client";

import { Bot, ChevronDown, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessage: Message = {
  role: "assistant",
  content: "Hi — I’m Christine’s AI career twin. Ask me about her experience, technical work, education, or the problems she likes to solve.",
};

const quickQuestions = [
  "What kind of AI work has Christine done?",
  "Tell me about her healthcare experience.",
  "What is The Dialectic?",
];

export function CareerChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent || loading) return;

    const userMessage: Message = { role: "user", content: cleanContent };
    const conversation = [...messages.filter((message) => message !== starterMessage), userMessage].slice(-11);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || "Unable to reach the digital twin.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply! }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to reach the digital twin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className={`career-chat${open ? " is-open" : ""}`} aria-label="Christine's digital career twin">
      <button className="chat-trigger" type="button" onClick={() => setOpen(true)} aria-label="Chat with Christine's digital twin" aria-expanded={open}>
        <span className="chat-trigger-icon"><Sparkles size={18} aria-hidden="true" /></span>
        <span className="chat-trigger-copy"><small>Ask my</small><strong>Digital twin</strong></span>
        <span className="chat-trigger-arrow">↗</span>
      </button>

      <div className="chat-panel" role="dialog" aria-modal="false" aria-label="Career chat" aria-hidden={!open}>
        <header className="chat-header">
          <div className="chat-identity">
            <span className="twin-avatar">CG<i /></span>
            <div><strong>Christine / Twin</strong><span><i /> AI CAREER GUIDE</span></div>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close career chat"><ChevronDown size={20} /></button>
        </header>

        <div className="chat-messages" ref={scrollRef} aria-live="polite">
          {messages.map((message, index) => (
            <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
              {message.role === "assistant" ? <span className="message-mark"><Bot size={13} /></span> : null}
              <p>{message.content}</p>
            </div>
          ))}

          {messages.length === 1 ? (
            <div className="quick-questions">
              <span>TRY ASKING</span>
              {quickQuestions.map((question) => (
                <button type="button" key={question} onClick={() => sendMessage(question)}>{question}<span>→</span></button>
              ))}
            </div>
          ) : null}

          {loading ? <div className="typing-indicator" aria-label="Digital twin is thinking"><span /><span /><span /></div> : null}
          {error ? <div className="chat-error"><X size={14} />{error}</div> : null}
        </div>

        <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); sendMessage(input); }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, 1200))}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask about Christine’s career..."
            aria-label="Ask a career question"
            rows={1}
          />
          <button type="submit" disabled={!input.trim() || loading} aria-label="Send message"><Send size={17} /></button>
          <span className="chat-disclaimer">AI-generated from Christine&apos;s verified career profile</span>
        </form>
      </div>
    </aside>
  );
}
