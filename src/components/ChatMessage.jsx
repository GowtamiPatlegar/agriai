import { motion } from 'framer-motion'

function ChatMessage({ message }) {
  const isFarmer = message.sender === 'farmer'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isFarmer ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm [overflow-wrap:anywhere] sm:max-w-[78%] sm:px-5 lg:max-w-[72%] ${
          isFarmer
            ? 'animated-gradient rounded-br-md border border-lime-100/30 bg-gradient-to-r from-emerald-400 to-lime-300 text-slate-950 shadow-md shadow-lime-300/10'
            : 'rounded-bl-md border border-emerald-200/20 bg-slate-900/92 text-slate-50 shadow-md shadow-emerald-950/20 ring-1 ring-white/8'
        } animate-message`}
      >
        {message.text}
      </motion.div>
    </motion.div>
  )
}

export default ChatMessage
