import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import WeatherIcon from '../components/WeatherIcon'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'

const fallbackLocation = {
  name: 'Hyderabad Farm Belt',
  latitude: 17.385,
  longitude: 78.4867,
  source: 'fallback',
}

const fallbackMetrics = [
  {
    label: 'Temperature',
    value: '29 C',
    note: 'Stable for vegetative growth',
    icon: 'sun',
    gradient: 'from-lime-300 to-emerald-500',
  },
  {
    label: 'Humidity',
    value: '74%',
    note: 'Monitor fungal risk',
    icon: 'drop',
    gradient: 'from-emerald-300 to-emerald-600',
  },
  {
    label: 'Rainfall',
    value: '18 mm',
    note: 'Likely after 6 PM',
    icon: 'cloud',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Wind',
    value: '12 km/h',
    note: 'Safe for morning spray',
    icon: 'wind',
    gradient: 'from-lime-500 to-green-500',
  },
  {
    label: 'UV Index',
    value: '7 High',
    note: 'Avoid noon field work',
    icon: 'uv',
    gradient: 'from-lime-300 to-emerald-500',
  },
]

const fallbackForecast = [
  { day: 'Mon', icon: 'cloud', high: '29 C', low: '23 C', rain: '68%', note: 'Showers' },
  { day: 'Tue', icon: 'drop', high: '28 C', low: '22 C', rain: '74%', note: 'Wet soil' },
  { day: 'Wed', icon: 'sun', high: '31 C', low: '24 C', rain: '22%', note: 'Spray ok' },
  { day: 'Thu', icon: 'wind', high: '30 C', low: '23 C', rain: '18%', note: 'Windy' },
  { day: 'Fri', icon: 'cloud', high: '27 C', low: '22 C', rain: '61%', note: 'Cloudy' },
  { day: 'Sat', icon: 'sun', high: '32 C', low: '24 C', rain: '12%', note: 'Hot noon' },
  { day: 'Sun', icon: 'drop', high: '29 C', low: '23 C', rain: '55%', note: 'Drizzle' },
]

const fallbackRecommendations = [
  {
    title: 'Delay pesticide spray',
    text: 'Rain probability crosses 60% after evening. Finish foliar work before 10 AM or wait for a drier window.',
    tag: 'Rain AI',
  },
  {
    title: 'Reduce irrigation by 30%',
    text: 'Soil moisture will stay elevated overnight. Water only young saplings and raised beds.',
    tag: 'Water Save',
  },
  {
    title: 'Scout lower leaves',
    text: 'High humidity may increase fungal risk in rice, wheat, cotton, chilli, vegetables, and fruit crops within 24 hours.',
    tag: 'Disease Risk',
  },
]

const fallbackCropAlerts = [
  { level: 'High', title: 'Fungal risk rising', text: 'Humidity above 70% for 9 hours.' },
  { level: 'Medium', title: 'UV stress window', text: 'Shade nursery trays from 12 PM to 3 PM.' },
  { level: 'Low', title: 'Wind drift check', text: 'Morning spray window remains stable.' },
]

function WeatherDashboardSkeleton() {
  return (
    <motion.div
      key="weather-dashboard-skeleton"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mt-10 space-y-6"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="weather-glass-card rounded-3xl p-5">
            <div className="shimmer h-14 w-14 rounded-2xl bg-emerald-100" />
            <div className="shimmer mt-5 h-3 w-28 rounded-full bg-slate-200/80" />
            <div className="shimmer mt-4 h-8 w-20 rounded-full bg-slate-200/80" />
            <div className="shimmer mt-4 h-3 w-32 rounded-full bg-emerald-100" />
          </div>
        ))}
      </div>
      <div className="weather-glass-card rounded-[2rem] p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {fallbackForecast.map((item) => (
            <div key={item.day} className="rounded-3xl bg-white/45 p-4">
              <div className="shimmer mx-auto h-11 w-11 rounded-2xl bg-emerald-100" />
              <div className="shimmer mx-auto mt-4 h-3 w-14 rounded-full bg-slate-200/80" />
              <div className="shimmer mx-auto mt-4 h-6 w-16 rounded-full bg-slate-200/80" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function getWeatherDescription(code) {
  if ([0, 1].includes(code)) return 'Clear and field-ready'
  if ([2, 3].includes(code)) return 'Cloud cover building'
  if ([45, 48].includes(code)) return 'Foggy field conditions'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle possible'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain risk active'
  if ([95, 96, 99].includes(code)) return 'Thunderstorm risk'
  return 'Mixed weather signals'
}

function getWeatherIcon(code, precipitationChance = 0, windSpeed = 0) {
  if ([0, 1].includes(code)) return 'sun'
  if (precipitationChance >= 55 || [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'drop'
  if (windSpeed >= 22) return 'wind'
  return 'cloud'
}

function formatTemperature(value) {
  return `${Math.round(value ?? 0)} C`
}

function getDayName(dateString) {
  return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date(dateString))
}

async function fetchLocationName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
    )

    if (!response.ok) {
      throw new Error('Reverse geocoding failed')
    }

    const data = await response.json()
    const address = data?.address ?? {}
    const city = address.city ?? address.town ?? address.village ?? address.county
    const region = address.state ?? address.region

    if (!city && !region) {
      return 'Your farm location'
    }

    return [city, region, address.country].filter(Boolean).join(', ')
  } catch {
    return 'Your farm location'
  }
}

async function fetchWeatherForCoordinates(location) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max',
    timezone: 'auto',
    forecast_days: '7',
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

  if (!response.ok) {
    throw new Error('Weather fetch failed')
  }

  const data = await response.json()
  const current = data.current ?? {}
  const daily = data.daily ?? {}
  const rainChance = daily.precipitation_probability_max?.[0] ?? 0
  const windSpeed = current.wind_speed_10m ?? daily.wind_speed_10m_max?.[0] ?? 0
  const humidity = current.relative_humidity_2m ?? 0
  const precipitation = daily.precipitation_sum?.[0] ?? current.precipitation ?? 0
  const uvIndex = daily.uv_index_max?.[0] ?? 0
  const weatherCode = current.weather_code ?? daily.weather_code?.[0] ?? 3
  const locationName = location.name ?? await fetchLocationName(location.latitude, location.longitude)

  const metrics = [
    {
      label: 'Temperature',
      value: formatTemperature(current.temperature_2m),
      note: current.temperature_2m >= 34 ? 'Heat stress watch' : 'Stable for crop activity',
      icon: 'sun',
      gradient: 'from-lime-300 to-emerald-500',
    },
    {
      label: 'Humidity',
      value: `${Math.round(humidity)}%`,
      note: humidity >= 70 ? 'Monitor fungal risk' : 'Comfortable canopy moisture',
      icon: 'drop',
      gradient: 'from-emerald-300 to-emerald-600',
    },
    {
      label: 'Rainfall',
      value: `${Number(precipitation).toFixed(1)} mm`,
      note: rainChance >= 55 ? 'Rain likely today' : 'Low rain signal',
      icon: 'cloud',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Wind',
      value: `${Math.round(windSpeed)} km/h`,
      note: windSpeed >= 22 ? 'Avoid spray drift' : 'Safe for field spray',
      icon: 'wind',
      gradient: 'from-lime-500 to-green-500',
    },
    {
      label: 'UV Index',
      value: `${Math.round(uvIndex)} ${uvIndex >= 7 ? 'High' : 'OK'}`,
      note: uvIndex >= 7 ? 'Avoid noon field work' : 'Moderate sun exposure',
      icon: 'uv',
      gradient: 'from-lime-300 to-emerald-500',
    },
  ]

  const forecast = (daily.time ?? []).slice(0, 7).map((day, index) => {
    const dayCode = daily.weather_code?.[index] ?? weatherCode
    const probability = daily.precipitation_probability_max?.[index] ?? 0
    const wind = daily.wind_speed_10m_max?.[index] ?? windSpeed

    return {
      day: getDayName(day),
      icon: getWeatherIcon(dayCode, probability, wind),
      high: formatTemperature(daily.temperature_2m_max?.[index]),
      low: formatTemperature(daily.temperature_2m_min?.[index]),
      rain: `${Math.round(probability)}%`,
      note: probability >= 60 ? 'Rain watch' : wind >= 24 ? 'Windy' : 'Field ok',
    }
  })

  const recommendations = [
    {
      title: rainChance >= 55 ? 'Delay pesticide spray' : 'Spray window available',
      text:
        rainChance >= 55
          ? 'Rain probability is elevated. Finish foliar work early or wait for a clearer window.'
          : 'Rain risk is low. Morning hours are suitable for foliar spray if wind remains calm.',
      tag: 'Rain AI',
    },
    {
      title: precipitation >= 5 ? 'Reduce irrigation today' : 'Use measured irrigation',
      text:
        precipitation >= 5
          ? 'Expected rainfall can cover part of today’s crop water need. Prioritize young plants only.'
          : 'No major rainfall signal. Irrigate based on crop stage and soil moisture checks.',
      tag: 'Water Save',
    },
    {
      title: humidity >= 70 ? 'Scout lower leaves' : 'Keep routine crop scouting',
      text:
        humidity >= 70
          ? 'High humidity can increase fungal pressure in dense canopies. Inspect lower leaves within 24 hours.'
          : 'Disease pressure is moderate. Keep scouting for early leaf color and spot changes.',
      tag: 'Disease Risk',
    },
  ]

  const cropAlerts = [
    {
      level: humidity >= 75 ? 'High' : 'Medium',
      title: humidity >= 75 ? 'Fungal risk rising' : 'Canopy moisture watch',
      text: `Humidity is near ${Math.round(humidity)}%. Check dense crop zones and shaded beds.`,
    },
    {
      level: uvIndex >= 7 ? 'High' : 'Low',
      title: uvIndex >= 7 ? 'UV stress window' : 'UV stress manageable',
      text: uvIndex >= 7 ? 'Protect nursery trays from noon sun.' : 'Normal field work window looks manageable.',
    },
    {
      level: windSpeed >= 22 ? 'Medium' : 'Low',
      title: 'Wind drift check',
      text: windSpeed >= 22 ? 'Delay fine spray until wind drops.' : 'Morning spray window remains stable.',
    },
  ]

  return {
    location: {
      ...location,
      name: locationName,
      temp: formatTemperature(current.temperature_2m),
      feels: `Feels like ${formatTemperature(current.apparent_temperature)}`,
      condition: getWeatherDescription(weatherCode),
      icon: getWeatherIcon(weatherCode, rainChance, windSpeed),
      window: rainChance >= 55 ? '6 AM - 9 AM' : '6 AM - 11 AM',
      crop: 'Local crop profile',
      confidence: `${Math.max(86, Math.min(96, 96 - Math.round(rainChance / 12)))}%`,
    },
    metrics,
    forecast,
    recommendations,
    cropAlerts,
    alert: rainChance >= 55 ? 'Rain risk detected near your farm' : 'Good field window near your farm',
    advisoryBadge: rainChance >= 55 ? 'Advisory: Rain Watch' : 'Advisory: Field Ready',
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 10 * 60 * 1000,
    })
  })
}

function WeatherAdvisory({ t }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [weatherError, setWeatherError] = useState('')
  const [selectedLocation, setSelectedLocation] = useState({
    ...fallbackLocation,
    temp: '29 C',
    feels: 'Feels like 32 C',
    condition: 'Cloudy with evening showers',
    icon: 'cloud',
    window: '6 AM - 10 AM',
    crop: 'Rice + Vegetables',
    confidence: '94%',
  })
  const [metrics, setMetrics] = useState(fallbackMetrics)
  const [forecast, setForecast] = useState(fallbackForecast)
  const [recommendations, setRecommendations] = useState(fallbackRecommendations)
  const [cropAlerts, setCropAlerts] = useState(fallbackCropAlerts)
  const [weatherAlert, setWeatherAlert] = useState(t.alertTitle)
  const [advisoryBadge, setAdvisoryBadge] = useState(t.advisoryBadge)

  const loadWeather = useCallback(async ({ forceFallback = false } = {}) => {
    setIsLoading(true)
    setWeatherError('')

    try {
      let location = fallbackLocation
      let usingFallback = forceFallback

      if (!forceFallback) {
        try {
          const position = await getCurrentPosition()

          location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            source: 'live',
          }
        } catch (error) {
          console.warn('Geolocation unavailable, using fallback weather:', error)
          usingFallback = true
        }
      }

      const weather = await fetchWeatherForCoordinates(location)

      setSelectedLocation(weather.location)
      setMetrics(weather.metrics)
      setForecast(weather.forecast.length ? weather.forecast : fallbackForecast)
      setRecommendations(weather.recommendations)
      setCropAlerts(weather.cropAlerts)
      setWeatherAlert(usingFallback ? 'Location permission unavailable. Showing fallback farm weather.' : weather.alert)
      setAdvisoryBadge(usingFallback ? 'Fallback: Hyderabad' : weather.advisoryBadge)
      setIsUsingFallback(usingFallback)
    } catch (error) {
      console.error('Weather fetch error:', error)
      setWeatherError('Weather data could not be refreshed right now.')
      setSelectedLocation((current) => ({
        ...current,
        ...fallbackLocation,
        name: 'Hyderabad Farm Belt',
      }))
      setMetrics(fallbackMetrics)
      setForecast(fallbackForecast)
      setRecommendations(fallbackRecommendations)
      setCropAlerts(fallbackCropAlerts)
      setWeatherAlert('Weather service is temporarily unavailable. Showing saved farm advisory.')
      setAdvisoryBadge('Retry available')
      setIsUsingFallback(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWeather()
  }, [loadWeather])

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="advisory"
      className="weather-dashboard-section overflow-hidden border-b border-emerald-100/80 px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="weather-cloud-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="weather-light-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="section-reveal relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={cardReveal}
          className="weather-alert-banner glow-card mb-8 rounded-[2rem] p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">
                {t.alertEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                {weatherAlert}
              </h2>
            </div>
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-emerald-800 shadow-sm">
              {advisoryBadge}
            </span>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <motion.div variants={cardReveal} className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                {t.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
                {t.subtitle}
              </p>
            </div>

            <motion.div
              layout
              className="mt-8 max-w-md rounded-[1.5rem] border border-emerald-100/80 bg-white/75 p-4 shadow-sm shadow-emerald-950/5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <span className="location-pin-icon mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-700/20">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                    Live location weather
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isLoading ? 'loading-location' : selectedLocation.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-1 truncate text-base font-black text-slate-950"
                    >
                      {isLoading ? 'Detecting your location...' : selectedLocation.name}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {isUsingFallback ? 'Fallback weather is active.' : 'Using your current coordinates.'}
                  </p>
                </div>
              </div>

              {weatherError && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-3 text-sm font-semibold text-emerald-900"
                >
                  {weatherError}
                </motion.div>
              )}

              <div className="mt-4 flex flex-col gap-2 min-[420px]:flex-row">
                <button
                  type="button"
                  onClick={() => loadWeather()}
                  disabled={isLoading}
                  className="button-lift rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Refreshing...' : 'Refresh weather'}
                </button>
                {weatherError && (
                  <button
                    type="button"
                    onClick={() => loadWeather({ forceFallback: true })}
                    className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-800 transition hover:border-lime-200 hover:bg-emerald-50"
                  >
                    Use fallback
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="current-weather-panel glow-card min-w-0 rounded-[1.5rem] p-4 text-white sm:rounded-[2rem] sm:p-5"
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-50">{t.today}</p>
                <div className="mt-5 flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="current-weather-icon">
                    <WeatherIcon type={selectedLocation.icon ?? 'cloud'} />
                  </div>
                  <div>
                    <p className="text-4xl font-black sm:text-6xl md:text-7xl">
                      {selectedLocation.temp}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-emerald-50">
                      {selectedLocation.feels}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold text-emerald-50">
                  {selectedLocation.condition}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:max-w-sm">
                <div className="weather-mini-tile">
                  <p>{t.bestWindow}</p>
                  <strong>{selectedLocation.window}</strong>
                </div>
                <div className="weather-mini-tile">
                  <p>Crop Profile</p>
                  <strong>{selectedLocation.crop}</strong>
                </div>
                <div className="weather-mini-tile sm:col-span-2">
                  <p>AI Confidence</p>
                  <strong>{selectedLocation.confidence}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <WeatherDashboardSkeleton />
          ) : (
            <motion.div
              key={selectedLocation.name}
              variants={sectionReveal}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12 }}
              className="mt-10 space-y-8"
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {metrics.map((metric) => (
                  <WeatherCard key={metric.label} metric={metric} />
                ))}
              </div>

              <motion.div
                variants={cardReveal}
                className="weather-glass-card rounded-[2rem] p-5 sm:p-6"
              >
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                      7-Day Forecast
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Field planning outlook
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-100 bg-white/70 px-4 py-2 text-sm font-black text-emerald-800">
                    AI updated now
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                  {forecast.map((item, index) => (
                    <motion.article
                      key={item.day}
                      variants={cardReveal}
                      custom={index}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="forecast-card rounded-3xl p-4 text-center"
                    >
                      <p className="text-sm font-black text-slate-500">{item.day}</p>
                      <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 text-white shadow-lg shadow-emerald-700/20">
                        <WeatherIcon type={item.icon} />
                      </div>
                      <p className="mt-4 text-lg font-black text-slate-950">
                        {item.high}
                      </p>
                      <p className="text-xs font-bold text-slate-500">
                        Low {item.low}
                      </p>
                      <p className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        {item.rain} rain
                      </p>
                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        {item.note}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                  variants={cardReveal}
                  className="weather-glass-card glow-card min-w-0 rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6"
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                    {t.recommendationsTitle}
                  </p>
                  <div className="mt-5 grid gap-4">
                    {recommendations.map((recommendation) => (
                      <div
                        key={recommendation.title}
                        className="ai-recommendation-row rounded-3xl p-4"
                      >
                        <span>{recommendation.tag}</span>
                        <div>
                          <h3 className="font-black text-slate-950">
                            {recommendation.title}
                          </h3>
                          <p className="mt-1 leading-7 text-slate-600">
                            {recommendation.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={cardReveal}
                  className="smart-alerts-panel glow-card min-w-0 rounded-[1.5rem] p-4 text-white sm:rounded-[2rem] sm:p-6"
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                    Smart Crop Alerts
                  </p>
                  <h2 className="mt-3 text-3xl font-black">Weather-aware crop watch</h2>
                  <div className="mt-5 space-y-3">
                    {cropAlerts.map((alert) => (
                      <div key={alert.title} className="smart-alert-row">
                        <span>{alert.level}</span>
                        <div>
                          <h3>{alert.title}</h3>
                          <p>{alert.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default WeatherAdvisory
