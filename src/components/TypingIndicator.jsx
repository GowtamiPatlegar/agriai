import { motion } from 'framer-motion'

function TypingIndicator({ title, status }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="animate-message max-w-[82%] rounded-3xl rounded-bl-md bg-white/90 px-4 py-4 shadow-sm ring-1 ring-emerald-100 sm:max-w-[72%]"
    >
      <div className="flex items-center gap-3">
        <span className="ai-pulse relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-500 text-white shadow-lg shadow-emerald-700/20">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4v16M7 7h10M7 17h10M8 4 6 7l2 3-2 4 2 6M16 4l2 3-2 3 2 4-2 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-slate-800">
            {title}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500" />
            <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500 [animation-delay:140ms]" />
            <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500 [animation-delay:280ms]" />
            <span className="ml-2 text-xs font-bold text-emerald-700">
              {status}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="shimmer h-2 w-full rounded-full bg-emerald-100" />
        <div className="shimmer h-2 w-3/4 rounded-full bg-emerald-100" />
      </div>
    </motion.div>
  )
}

export default TypingIndicator
