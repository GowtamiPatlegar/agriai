import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import TypingIndicator from '../components/TypingIndicator'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { getHuggingFaceChatbotResponse } from '../services/huggingFaceService'

function FarmingChatbot({ t }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

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
      className="particle-field border-b border-emerald-950/10 bg-[radial-gradient(circle_at_top_left,#ccfbf1,transparent_30%),radial-gradient(circle_at_bottom_right,#0f766e22,transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_44%,#ecfdf5_100%)] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div variants={cardReveal} className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={cardReveal}
          className="assistant-shell glow-card relative min-w-0 overflow-hidden rounded-[1.5rem] p-2 sm:rounded-[2rem] sm:p-3 md:p-4 lg:float-soft"
        >
          <div className="assistant-grid absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="relative flex min-h-[calc(100dvh-10rem)] max-h-[calc(100dvh-7rem)] flex-col rounded-[1.2rem] border border-emerald-200/15 bg-slate-950/82 shadow-lg shadow-emerald-950/20 backdrop-blur-sm sm:min-h-[520px] sm:max-h-[680px] sm:rounded-[1.5rem] lg:min-h-[620px]">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-emerald-300/20 bg-slate-950/40 px-3 py-3 sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="assistant-avatar animated-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-lime-300 text-slate-950 shadow-lg shadow-emerald-300/25 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
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
                <div className="min-w-0">
                  <h3 className="truncate font-black text-white">{t.chatTitle}</h3>
                  <p className="truncate text-xs font-semibold text-emerald-200 sm:text-sm">
                    {t.status}
                  </p>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full border border-lime-300/35 bg-lime-300/15 px-3 py-1 text-xs font-black text-lime-100 shadow-sm shadow-lime-300/10 backdrop-blur-sm min-[380px]:inline-flex">
                {t.live}
              </span>
            </div>

            <motion.div layout className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain scroll-smooth px-3 py-4 sm:space-y-4 sm:px-5 sm:py-5">
              <AnimatePresence initial={false}>
                {messages.length === 0 && !isTyping && (
                  <motion.div
                    key="chat-helper"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex h-full items-center justify-center text-center"
                  >
                    <p className="max-w-xs rounded-2xl border border-emerald-200/15 bg-slate-900/85 px-4 py-3 text-sm font-semibold leading-6 text-slate-100 shadow-sm shadow-emerald-950/20 backdrop-blur-sm sm:px-5 sm:py-4">
                      Ask about rice, wheat, cotton, maize, chilli, sugarcane, vegetables, fruits, soil, irrigation, or weather
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
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </motion.div>

            <form
              onSubmit={handleSend}
              className="flex shrink-0 flex-col gap-2 border-t border-emerald-300/20 bg-slate-950/42 p-3 sm:flex-row sm:gap-3 sm:p-4"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={t.placeholder}
                className="assistant-input min-h-11 w-full min-w-0 flex-1 rounded-2xl border border-emerald-300/20 px-4 text-sm font-medium text-white outline-none transition placeholder:text-slate-400 focus:border-lime-300/70 focus:ring-4 focus:ring-emerald-300/10 sm:min-h-12 sm:text-base"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="button-lift animated-gradient min-h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
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
