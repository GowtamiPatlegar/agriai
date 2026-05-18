import { motion } from 'framer-motion'

function ChatMessage({ message }) {
  const isFarmer = message.sender === 'farmer'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isFarmer ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className={`max-w-[82%] rounded-3xl px-5 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%] ${
          isFarmer
            ? 'animated-gradient rounded-br-md bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-emerald-700/20'
            : 'rounded-bl-md bg-white/85 text-slate-700 ring-1 ring-emerald-100'
        } animate-message`}
      >
        {message.text}
      </motion.div>
    </motion.div>
  )
}

export default ChatMessage
