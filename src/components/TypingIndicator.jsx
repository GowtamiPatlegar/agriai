import { motion } from 'framer-motion'

function TypingIndicator({ title, status }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="animate-message max-w-[92%] rounded-3xl rounded-bl-md border border-emerald-200/20 bg-slate-900/92 px-4 py-4 text-slate-50 shadow-md shadow-emerald-950/20 ring-1 ring-white/8 sm:max-w-[78%] lg:max-w-[72%]"
    >
      <div className="flex items-center gap-3">
        <span className="assistant-avatar relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-300 text-slate-950 shadow-lg shadow-emerald-300/20">
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
          <p className="text-sm font-black text-white">
            {title}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="typing-dot h-2 w-2 rounded-full bg-lime-300" />
            <span className="typing-dot h-2 w-2 rounded-full bg-lime-300 [animation-delay:140ms]" />
            <span className="typing-dot h-2 w-2 rounded-full bg-lime-300 [animation-delay:280ms]" />
            <span className="ml-2 text-xs font-bold text-emerald-200">
              {status}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="shimmer h-2 w-full rounded-full bg-white/10" />
        <div className="shimmer h-2 w-3/4 rounded-full bg-white/10" />
      </div>
    </motion.div>
  )
}

export default TypingIndicator
