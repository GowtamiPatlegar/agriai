function WeatherIcon({ type }) {
  const commonProps = {
    className: 'h-7 w-7',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }

  if (type === 'sun') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (type === 'drop') {
    return (
      <svg {...commonProps}>
        <path
          d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (type === 'cloud') {
    return (
      <svg {...commonProps}>
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
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path
        d="M4 8h10a3 3 0 1 0-3-3M4 13h15a3 3 0 1 1-3 3M4 18h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default WeatherIcon
