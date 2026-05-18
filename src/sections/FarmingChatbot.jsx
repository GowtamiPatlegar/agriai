import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import TypingIndicator from '../components/TypingIndicator'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { getHuggingFaceChatbotResponse } from '../services/huggingFaceService'

function FarmingChatbot({ t }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  async function handleSend(event) {
    event.preventDefault()

    const question = inputValue.trim()

    if (!question) {
      return
    }

    const farmerMessage = {
      id: Date.now(),
      sender: 'farmer',
      text: question,
    }

    setMessages((currentMessages) => [...currentMessages, farmerMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await getHuggingFaceChatbotResponse(question)
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response,
      }

      setMessages((currentMessages) => [...currentMessages, aiMessage])
    } catch (error) {
      console.error('Chatbot Hugging Face error:', error instanceof Error ? error.message : error)
      console.error('Full chatbot error object:', error)

      const fallbackMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'I could not reach the AI service right now. Please check your Hugging Face API key or internet connection, then try again. For urgent crop disease, fertilizer, irrigation, soil, or weather issues, contact a local agriculture officer.',
      }

      setMessages((currentMessages) => [...currentMessages, fallbackMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="assistant"
      className="particle-field border-b border-emerald-950/10 bg-[radial-gradient(circle_at_top_left,#ccfbf1,transparent_30%),radial-gradient(circle_at_bottom_right,#0f766e22,transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_44%,#ecfdf5_100%)] px-5 py-20 sm:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div variants={cardReveal}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={cardReveal}
          className="assistant-shell glow-card float-soft relative overflow-hidden rounded-[2rem] p-3 sm:p-4"
        >
          <div className="assistant-grid absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative rounded-[1.5rem] border border-white/10 bg-slate-950/52 shadow-inner shadow-emerald-300/5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-emerald-300/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="assistant-avatar animated-gradient flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-lime-300 text-slate-950 shadow-lg shadow-emerald-300/25">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3v18M7 7h10M7 17h10M8 3 6 7l2 3-2 4 2 7M16 3l2 4-2 3 2 4-2 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-white">{t.chatTitle}</h3>
                  <p className="text-sm font-semibold text-emerald-200">
                    {t.status}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-black text-lime-200 shadow-sm shadow-lime-300/10 backdrop-blur">
                {t.live}
              </span>
            </div>

            <motion.div layout className="h-[430px] space-y-4 overflow-y-auto scroll-smooth px-4 py-5 sm:px-5">
              <AnimatePresence initial={false}>
                {messages.length === 0 && !isTyping && (
                  <motion.div
                    key="chat-helper"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex h-full items-center justify-center text-center"
                  >
                    <p className="max-w-xs rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold leading-6 text-slate-300 shadow-inner shadow-white/5 backdrop-blur">
                      Ask about crops, soil, fertilizer, irrigation, or weather
                    </p>
                  </motion.div>
                )}

                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping && (
                  <motion.div
                    key="ai-thinking"
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex justify-start"
                  >
                    <TypingIndicator title={t.typingTitle} status={t.typingStatus} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <form
              onSubmit={handleSend}
              className="flex flex-col gap-3 border-t border-emerald-300/15 p-4 sm:flex-row"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={t.placeholder}
                className="assistant-input min-h-12 flex-1 rounded-2xl border border-emerald-300/20 px-4 font-medium text-white outline-none transition placeholder:text-slate-400 focus:border-lime-300/70 focus:ring-4 focus:ring-emerald-300/10"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="button-lift animated-gradient rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-6 py-3 font-black text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {t.send}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default FarmingChatbot
