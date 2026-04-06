import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  isWhatsApp?: boolean;
}

const WHATSAPP_URL =
  "https://wa.me/919919031626?text=Hi%20MODO%2C%20I%20need%20help%20with%20my%20order";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
      role="img"
    >
      <title>WhatsApp</title>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function getBotResponse(message: string): {
  text: string;
  isWhatsApp: boolean;
} {
  const msg = message.toLowerCase().trim();

  if (/\b(hello|hi|hey|hii|helo|namaste)\b/.test(msg)) {
    return {
      text: "Hi! Welcome to MODO. How can I help you today? 😊",
      isWhatsApp: false,
    };
  }
  if (/\b(shipping|delivery|deliver|dispatch|courier)\b/.test(msg)) {
    return {
      text: "We offer free shipping on orders above ₹999. Standard delivery takes 3-5 business days across India. 🚚",
      isWhatsApp: false,
    };
  }
  if (/\b(return|refund|exchange|replace|replacement)\b/.test(msg)) {
    return {
      text: "We have a 7-day easy return policy. Items must be unused with tags attached. WhatsApp us for quick processing! 📦",
      isWhatsApp: true,
    };
  }
  if (/\b(size|fit|fitting|measurement|measurements|chart)\b/.test(msg)) {
    return {
      text: "We offer XS to 3XL. Check the size guide on each product page. When in doubt, size up! 📏",
      isWhatsApp: false,
    };
  }
  if (/\b(order|track|tracking|status|where is)\b/.test(msg)) {
    return {
      text: "To track your order, WhatsApp us your order ID at 9919031626 and we'll update you instantly! 📍",
      isWhatsApp: true,
    };
  }
  if (/\b(discount|coupon|offer|sale|off|promo|code|deal)\b/.test(msg)) {
    return {
      text: "We're currently running 50% OFF on all products! 🎉 No coupon needed — discount is auto-applied at checkout.",
      isWhatsApp: false,
    };
  }
  if (/\b(payment|pay|cod|cash|upi|card|net banking|wallet)\b/.test(msg)) {
    return {
      text: "We accept UPI, credit/debit cards, net banking, and Cash on Delivery (COD) across India. 💳",
      isWhatsApp: false,
    };
  }
  if (/\b(contact|whatsapp|phone|call|number|support|help)\b/.test(msg)) {
    return {
      text: "You can reach us instantly on WhatsApp! Our team is available 10am–8pm every day. 📱",
      isWhatsApp: true,
    };
  }
  return {
    text: "I'm not sure about that. Please WhatsApp us at 9919031626 for instant help — we're available 10am–8pm! 🙏",
    isWhatsApp: true,
  };
}

const QUICK_REPLIES = [
  "Shipping Info",
  "Returns",
  "Size Guide",
  "Track Order",
  "Offers & Discounts",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "👋 Hi! I'm MODO's AI assistant. How can I help you today?",
  sender: "bot",
  isWhatsApp: false,
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change or typing indicator toggles
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger on messages/isTyping change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const openChat = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([WELCOME_MESSAGE]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      text: text.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        text: response.text,
        sender: "bot",
        isWhatsApp: response.isWhatsApp,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            data-ocid="chatbot.open_modal_button"
            className="fixed bottom-28 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl ring-2 ring-white/10"
            style={{ background: "oklch(0.65 0.18 28)" }}
            onClick={openChat}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Chat with MODO Support"
          >
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-ocid="chatbot.dialog"
            className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:w-[380px]"
            style={{
              background: "oklch(0.09 0 0)",
              height: "min(520px, calc(100dvh - 6rem))",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 20, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Header */}
            <div
              className="flex shrink-0 items-center justify-between px-4 py-3"
              style={{
                background: "oklch(0.12 0 0)",
                borderBottom: "1px solid oklch(0.18 0 0)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-white"
                    style={{
                      background: "oklch(0.65 0.18 28)",
                      fontSize: "13px",
                      fontFamily: "BricolageGrotesque, sans-serif",
                    }}
                  >
                    M
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[oklch(0.12_0_0)] bg-green-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold tracking-wide text-white"
                      style={{ fontFamily: "BricolageGrotesque, sans-serif" }}
                    >
                      MODO Support
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/80"
                      style={{ background: "oklch(0.65 0.18 28)" }}
                    >
                      AI Powered
                    </span>
                  </div>
                  <p className="text-[11px] text-green-400">
                    Online • 10am–8pm
                  </p>
                </div>
              </div>
              <button
                type="button"
                data-ocid="chatbot.close_button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages area */}
            <div
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm text-white/90"
                    }`}
                    style={{
                      background:
                        msg.sender === "user"
                          ? "oklch(0.65 0.18 28 / 0.85)"
                          : "oklch(0.16 0 0)",
                    }}
                  >
                    <p>{msg.text}</p>
                    {msg.isWhatsApp && msg.sender === "bot" && (
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="chatbot.button"
                        className="mt-2.5 flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#25D366" }}
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp Us Now
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    data-ocid="chatbot.loading_state"
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <div
                      className="flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3"
                      style={{ background: "oklch(0.16 0 0)" }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-white/40"
                          animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply chips — only show when welcome message is active */}
            {messages.length <= 1 && !isTyping && (
              <div className="shrink-0 px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      data-ocid="chatbot.button"
                      onClick={() => sendMessage(reply)}
                      className="rounded-full px-3 py-1.5 text-xs font-medium text-white/80 transition-all hover:text-white"
                      style={{
                        background: "oklch(0.18 0 0)",
                        border: "1px solid oklch(0.25 0 0)",
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp persistent footer */}
            <div className="shrink-0 px-4 pb-1 pt-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="chatbot.secondary_button"
                className="flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "oklch(0.55 0.15 145)",
                  margin: "0 0 4px",
                }}
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Chat on WhatsApp: 9919031626
              </a>
            </div>

            {/* Input bar */}
            <form onSubmit={handleSubmit} className="shrink-0 px-3 pb-3">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "oklch(0.16 0 0)",
                  border: "1px solid oklch(0.22 0 0)",
                }}
              >
                <input
                  ref={inputRef}
                  data-ocid="chatbot.input"
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  data-ocid="chatbot.submit_button"
                  disabled={!inputValue.trim() || isTyping}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-all disabled:opacity-30"
                  style={{
                    background: inputValue.trim()
                      ? "oklch(0.65 0.18 28)"
                      : "oklch(0.25 0 0)",
                  }}
                  title="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
