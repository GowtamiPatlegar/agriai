import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import TypingIndicator from '../components/TypingIndicator'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'
import { getHuggingFaceChatbotResponse } from '../services/huggingFaceService'

const speechLanguageMap = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
}

function getSpeechVoice(speechLanguage) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null
  }

  const voices = window.speechSynthesis.getVoices()
  const languagePrefix = speechLanguage.split('-')[0]

  return voices.find((voice) => voice.lang === speechLanguage)
    ?? voices.find((voice) => voice.lang?.startsWith(`${languagePrefix}-`))
    ?? null
}

function FarmingChatbot() {
  const { language, t } = useLanguage()
  const chatbotText = t.chatbot
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)
  const [isSpeechRecognitionSupported] = useState(() => (
    typeof window !== 'undefined'
    && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  ))
  const [isSpeechSynthesisSupported] = useState(() => (
    typeof window !== 'undefined' && 'speechSynthesis' in window
  ))
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const speechLanguage = speechLanguageMap[language] ?? speechLanguageMap.en

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  const speakText = useCallback((text) => {
    if (!isSpeechSynthesisSupported || !isSpeechEnabled || !text) {
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = speechLanguage
    utterance.voice = getSpeechVoice(speechLanguage)
    utterance.rate = 0.95
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
  }, [isSpeechEnabled, isSpeechSynthesisSupported, speechLanguage])

  useEffect(() => () => {
    recognitionRef.current?.abort()
    window.speechSynthesis?.cancel()
  }, [])

  useEffect(() => {
    if (!isSpeechSynthesisSupported || isSpeechEnabled) {
      return
    }

    window.speechSynthesis.cancel()
  }, [isSpeechEnabled, isSpeechSynthesisSupported])

  useEffect(() => {
    recognitionRef.current?.abort()
    window.speechSynthesis?.cancel()
  }, [speechLanguage])

  function toggleListening() {
    if (!isSpeechRecognitionSupported) {
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = speechLanguage
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim()

      if (transcript) {
        setInputValue(transcript)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

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
      const response = await getHuggingFaceChatbotResponse(question, language)
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response,
      }

      setMessages((currentMessages) => [...currentMessages, aiMessage])
      speakText(response)
    } catch (error) {
      console.error('Chatbot Hugging Face error:', error instanceof Error ? error.message : error)
      console.error('Full chatbot error object:', error)

      const fallbackText = chatbotText.typingTitle
      const fallbackMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: fallbackText,
      }

      setMessages((currentMessages) => [...currentMessages, fallbackMessage])
      speakText(fallbackText)
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
      className="scroll-section particle-field border-b border-emerald-950/10 bg-[radial-gradient(circle_at_top_left,#ccfbf1,transparent_30%),radial-gradient(circle_at_bottom_right,#0f766e22,transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_44%,#ecfdf5_100%)] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div variants={cardReveal} className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {chatbotText.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            {chatbotText.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {chatbotText.subtitle}
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
                  <h3 className="truncate font-black text-white">{chatbotText.chatTitle}</h3>
                  <p className="truncate text-xs font-semibold text-emerald-200 sm:text-sm">
                    {chatbotText.status}
                  </p>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full border border-lime-300/35 bg-lime-300/15 px-3 py-1 text-xs font-black text-lime-100 shadow-sm shadow-lime-300/10 backdrop-blur-sm min-[380px]:inline-flex">
                {chatbotText.live}
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
                      {chatbotText.placeholder}
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
                    <TypingIndicator title={chatbotText.typingTitle} status={chatbotText.typingStatus} />
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
                placeholder={chatbotText.placeholder}
                className="assistant-input min-h-11 w-full min-w-0 flex-1 rounded-2xl border border-emerald-300/20 px-4 text-sm font-medium text-white outline-none transition placeholder:text-slate-400 focus:border-lime-300/70 focus:ring-4 focus:ring-emerald-300/10 sm:min-h-12 sm:text-base"
              />
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!isSpeechRecognitionSupported}
                  className={`button-lift grid min-h-11 w-12 place-items-center rounded-2xl border border-emerald-300/20 text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:min-h-12 sm:w-12 ${
                    isListening
                      ? 'animated-gradient bg-gradient-to-r from-lime-400 to-emerald-400 shadow-lime-300/25'
                      : 'bg-slate-900/80 shadow-emerald-950/20 hover:border-lime-300/50 hover:bg-emerald-900/80'
                  }`}
                  aria-label="Use microphone"
                  title="Use microphone"
                >
                  <span className={`relative grid place-items-center ${isListening ? 'pulse-soft' : ''}`}>
                    {isListening && (
                      <span className="absolute h-8 w-8 rounded-full border border-lime-200/70" aria-hidden="true" />
                    )}
                    <svg className="relative h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v3M8 21h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSpeechEnabled((current) => !current)}
                  disabled={!isSpeechSynthesisSupported}
                  className={`button-lift grid min-h-11 w-12 place-items-center rounded-2xl border border-emerald-300/20 text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:min-h-12 sm:w-12 ${
                    isSpeechEnabled
                      ? 'animated-gradient bg-gradient-to-r from-emerald-500 to-lime-400 shadow-lime-300/25'
                      : 'bg-slate-900/80 shadow-emerald-950/20 hover:border-lime-300/50 hover:bg-emerald-900/80'
                  }`}
                  aria-label="Toggle speaker"
                  title="Toggle speaker"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 9v6h4l5 4V5L8 9H4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {isSpeechEnabled ? (
                      <path
                        d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="m17 9 4 4M21 9l-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                disabled={isTyping}
                className="button-lift animated-gradient min-h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
              >
                {chatbotText.send}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default FarmingChatbot
