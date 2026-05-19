import { motion } from 'framer-motion'

function WeatherIcon({ type }) {
  const commonProps = {
    className: 'h-7 w-7',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }

  if (type === 'sun') {
    return (
      <motion.svg
        {...commonProps}
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </motion.svg>
    )
  }

  if (type === 'drop') {
    return (
      <motion.svg
        {...commonProps}
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          animate={{ pathLength: [0.82, 1, 0.82] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    )
  }

  if (type === 'cloud') {
    return (
      <motion.svg
        {...commonProps}
        animate={{ x: [-1, 2, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M7 18h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.3 8.2 5 5 0 0 0 7 18Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M9 21l1-2m4 2 1-2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </motion.svg>
    )
  }

  if (type === 'uv') {
    return (
      <motion.svg
        {...commonProps}
        animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 3v2m0 14v2M5.6 5.6 7 7m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M8 12h8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.55"
        />
      </motion.svg>
    )
  }

  return (
    <motion.svg
      {...commonProps}
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M4 8h10a3 3 0 1 0-3-3M4 13h15a3 3 0 1 1-3 3M4 18h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </motion.svg>
  )
}

export default WeatherIcon
