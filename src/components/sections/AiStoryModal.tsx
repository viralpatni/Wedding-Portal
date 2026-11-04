import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storyData from "@/data/story.json";
import { weddingConfig } from "@/config/weddingConfig";

interface Message {
  role: "assistant" | "user";
  text: string;
}

interface AiStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "When is Ankit & Avani's wedding date? 💍",
  "What is the wedding theme and tagline? ✨",
  "How can I download the wedding calendar invite? 📅",
  "What is the story behind this website? 🎁",
];

export default function AiStoryModal({ isOpen, onClose }: AiStoryModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Namaste! I am the digital storyteller for ${weddingConfig.groomName} & ${weddingConfig.brideName}'s wedding. Ask me anything about their special day on 26 January 2027! 💕`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function getLocalStoryAnswer(question: string): string {
    const q = question.toLowerCase();

    if (q.includes("date") || q.includes("when")) {
      return `Ankit & Avani's wedding celebration is scheduled for 26th January 2027 (Republic Day) in the Asia/Kolkata timezone (IST)!`;
    }
    if (q.includes("tagline") || q.includes("quote") || q.includes("theme")) {
      return `The official wedding tagline is "${weddingConfig.tagline}" and the website is titled "${weddingConfig.websiteName}".`;
    }
    if (q.includes("calendar") || q.includes("invite") || q.includes("ics") || q.includes("google")) {
      return `You can easily add the celebration to your Apple, Outlook, or Google Calendar using the '.ics' and 'Google Calendar' buttons in the Countdown and Invitation sections above!`;
    }
    if (q.includes("gift") || q.includes("brother") || q.includes("family") || q.includes("creator")) {
      return `This website is a bespoke digital wedding gift created with immense love by the family for elder brother Ankit and sister-in-law Avani.`;
    }
    if (q.includes("venue") || q.includes("where") || q.includes("location") || q.includes("schedule")) {
      return `Venue and specific ceremony schedules are currently being finalized by the family and will be updated right here once confirmed ("Details Coming Soon").`;
    }
    if (q.includes("story") || q.includes("meet") || q.includes("memories")) {
      return `Ankit & Avani's story is told through six beautiful chapters in the 'Our Story' section above. As photographs and specific memories are added, each chapter will come to life with their personal memories!`;
    }

    return `Ankit and Avani's wedding celebration takes place on 26th January 2027. We are counting down every heartbeat until their sacred vows begin!`;
  }

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || isLoading) return;

    const userMsg: Message = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 600));
      const answer = getLocalStoryAnswer(prompt);
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Ankit & Avani will be married on 26 January 2027. Thank you for your warm love and blessings! 💕`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#3A211C]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#FFF8F0] rounded-3xl shadow-2xl border border-[#D4AF77]/40 flex flex-col h-[560px] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#D4AF77]/20 flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF77] to-[#641E2B] flex items-center justify-center text-white text-lg">
                  ✨
                </div>
                <div>
                  <h3 className="font-display italic text-xl text-[#3A211C] leading-none">
                    Wedding Storyteller AI
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#641E2B] font-body mt-0.5 font-semibold">
                    Ankit &amp; Avani's Wedding Guide
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#3A211C]/10 hover:bg-[#3A211C]/20 text-[#3A211C] flex items-center justify-center text-sm transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Messages Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-body leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#3A211C] text-[#FFF8F0] rounded-tr-none"
                        : "bg-white text-[#3A211C] border border-[#D4AF77]/30 shadow-sm rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#D4AF77]/30 rounded-2xl rounded-tl-none p-3.5 text-xs text-[#3A211C]/60 italic font-body flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#641E2B] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#641E2B] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#641E2B] animate-bounce [animation-delay:0.4s]" />
                    <span>Gathering memories...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 border-t border-[#D4AF77]/15 bg-white/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-[#D4AF77]/30 text-[11px] font-body text-[#3A211C]/80 hover:bg-[#FFF8F0] hover:text-[#3A211C] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#D4AF77]/20 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question about the wedding..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#FFF8F0] border border-[#D4AF77]/30 text-xs sm:text-sm text-[#3A211C] focus:outline-none focus:border-[#641E2B]"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#3A211C] text-[#FFF8F0] text-xs uppercase tracking-wider font-body font-semibold hover:bg-[#641E2B] disabled:opacity-40 transition-colors"
              >
                Send
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
