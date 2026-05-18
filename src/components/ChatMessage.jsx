import { motion } from 'framer-motion'

function ChatMessage({ message }) {
  const isFarmer = message.sender === 'farmer'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(3px)' }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isFarmer ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className={`max-w-[82%] rounded-3xl px-5 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%] ${
          isFarmer
            ? 'animated-gradient rounded-br-md border border-lime-200/20 bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-lg shadow-lime-300/15'
            : 'rounded-bl-md border border-emerald-300/15 bg-white/8 text-slate-100 shadow-lg shadow-emerald-950/20 backdrop-blur ring-1 ring-white/10'
        } animate-message`}
      >
        {message.text}
      </motion.div>
    </motion.div>
  )
}

export default ChatMessage
