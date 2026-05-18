import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import TypingIndicator from '../components/TypingIndicator'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { sampleMessages } from '../data/agriData'
import { getChatbotResponse } from '../services/mockAiService'

function FarmingChatbot({ t }) {
  const [messages, setMessages] = useState(sampleMessages)
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

    const response = await getChatbotResponse()
    const aiMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: response,
    }

    setMessages((currentMessages) => [...currentMessages, aiMessage])
    setIsTyping(false)
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="assistant"
      className="particle-field border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,#ccfbf1,transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_44%,#ecfdf5_100%)] px-5 py-20 sm:px-8 lg:py-24"
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
          className="glow-card float-soft rounded-[2rem] border border-white/80 bg-white/55 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl sm:p-5"
        >
          <div className="rounded-[1.5rem] border border-white/80 bg-white/70 shadow-inner shadow-emerald-900/5 backdrop-blur">
            <div className="flex items-center justify-between border-b border-emerald-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="animated-gradient flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-500 shadow-lg shadow-emerald-700/25">
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent" />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">{t.chatTitle}</h3>
                  <p className="text-sm font-semibold text-emerald-700">
                    {t.status}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                {t.live}
              </span>
            </div>

            <motion.div layout className="h-[430px] space-y-4 overflow-y-auto scroll-smooth px-4 py-5 sm:px-5">
              <AnimatePresence initial={false}>
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
              className="flex flex-col gap-3 border-t border-emerald-100 p-4 sm:flex-row"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={t.placeholder}
                className="min-h-12 flex-1 rounded-2xl border border-emerald-100 bg-white/90 px-4 font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
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
