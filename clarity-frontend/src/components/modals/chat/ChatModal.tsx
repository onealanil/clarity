import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles, Bot, User, AlertCircle } from "lucide-react";
import { BASE_URL } from "../../../config/config";
import { ChatModalProps, Message } from "../../../interfaces/chat/chat";
import { promptTemplates } from "./helper/prompt";

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const systemContext =
        "You are a helpful financial wellness assistant for Clarity budgeting app. Give concise, encouraging advice (2-3 sentences max).";

      const fullPrompt = `${systemContext}\n\nUser: ${userMessage}\nAssistant:`;

      const response = await fetch(
        `${BASE_URL}proxy-chat?prompt=${encodeURIComponent(fullPrompt)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const data = await response.text();

      const assistantMsg: Message = {
        role: "assistant",
        content: data.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
      console.error("Chat error:", err);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    const trimmedInput = input.trim();
    let finalPrompt = trimmedInput;

    if (!finalPrompt) {
      const categories = Object.keys(
        promptTemplates
      ) as Array<keyof typeof promptTemplates>;
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)]!;
      const templates = promptTemplates[randomCategory];
      finalPrompt = templates[Math.floor(Math.random() * templates.length)]!;
    }

    sendMessage(finalPrompt);
  };

  const handleClose = () => {
    setMessages([]);
    setInput("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-clarity-green to-clarity-lightGreen p-6 flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-white">
                      AI Assistant
                    </h2>
                    <p className="text-white/80 text-sm font-body">
                      Your financial wellness companion
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50">
              {messages.length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-clarity-green to-clarity-lightGreen rounded-3xl flex items-center justify-center">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                      How can I help you today?
                    </h3>
                    <p className="text-stone-500 font-body text-sm max-w-sm">
                      Ask me anything about budgeting, saving tips, or managing
                      your expenses. Or just hit send for a surprise!
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md">
                    {Object.values(promptTemplates)
                      .flat()
                      .slice(0, 3)
                      .map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(prompt)}
                          className="px-4 py-2 bg-white border-2 border-stone-200 rounded-xl text-sm font-body text-stone-600 hover:border-clarity-green hover:text-clarity-green transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-clarity-green"
                        : "bg-white border-2 border-stone-200"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-clarity-green" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-4 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-clarity-green text-white rounded-tr-none"
                        : "bg-white text-clarity-charcoal border-2 border-stone-200 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-stone-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-clarity-green" />
                  </div>
                  <div className="bg-white border-2 border-stone-200 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-clarity-green rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-clarity-green rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-clarity-green rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-sm text-stone-500 font-body">
                      Thinking...
                    </span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <p className="text-sm text-rose-600 font-body">{error}</p>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-white border-t-2 border-stone-100 flex-shrink-0">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    isLoading
                      ? "AI is thinking..."
                      : "Type a message or press send for a surprise..."
                  }
                  disabled={isLoading}
                  className="flex-1 border-2 border-stone-200 rounded-2xl px-5 py-3 font-body text-sm focus:outline-none focus:border-clarity-green transition-colors disabled:bg-stone-50 disabled:cursor-not-allowed placeholder:text-stone-400"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 font-body font-medium ${
                    isLoading
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                      : "bg-clarity-green text-white hover:bg-clarity-green/90 hover:scale-105 active:scale-95 shadow-lg shadow-clarity-green/30"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;