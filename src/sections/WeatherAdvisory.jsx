import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import WeatherIcon from '../components/WeatherIcon'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'

const locations = [
  {
    name: 'Hyderabad Farm Belt',
    crop: 'Rice + Vegetables',
    temp: '29 C',
    feels: 'Feels like 32 C',
    condition: 'Cloudy with evening showers',
    window: '6 AM - 10 AM',
    confidence: '94%',
  },
  {
    name: 'Guntur Delta',
    crop: 'Cotton + Chilli',
    temp: '31 C',
    feels: 'Feels like 35 C',
    condition: 'Humid with scattered rain',
    window: '5:30 AM - 9 AM',
    confidence: '91%',
  },
  {
    name: 'Nashik Vineyard',
    crop: 'Fruits + Sugarcane',
    temp: '26 C',
    feels: 'Feels like 28 C',
    condition: 'Clear morning, windy dusk',
    window: '7 AM - 11 AM',
    confidence: '89%',
  },
]

const baseMetrics = [
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

const forecast = [
  { day: 'Mon', icon: 'cloud', high: '29 C', low: '23 C', rain: '68%', note: 'Showers' },
  { day: 'Tue', icon: 'drop', high: '28 C', low: '22 C', rain: '74%', note: 'Wet soil' },
  { day: 'Wed', icon: 'sun', high: '31 C', low: '24 C', rain: '22%', note: 'Spray ok' },
  { day: 'Thu', icon: 'wind', high: '30 C', low: '23 C', rain: '18%', note: 'Windy' },
  { day: 'Fri', icon: 'cloud', high: '27 C', low: '22 C', rain: '61%', note: 'Cloudy' },
  { day: 'Sat', icon: 'sun', high: '32 C', low: '24 C', rain: '12%', note: 'Hot noon' },
  { day: 'Sun', icon: 'drop', high: '29 C', low: '23 C', rain: '55%', note: 'Drizzle' },
]

const recommendations = [
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

const cropAlerts = [
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
          {forecast.map((item) => (
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

function WeatherAdvisory({ t }) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1250)

    return () => clearTimeout(loadingTimer)
  }, [selectedLocation])

  const handleLocationChange = (event) => {
    const location = locations.find((item) => item.name === event.target.value)
    setSelectedLocation(location ?? locations[0])
    setIsLoading(true)
  }

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
                {t.alertTitle}
              </h2>
            </div>
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-emerald-800 shadow-sm">
              {t.advisoryBadge}
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

            <label className="weather-location-control mt-8 block max-w-md">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                Location
              </span>
              <select
                value={selectedLocation.name}
                onChange={handleLocationChange}
                className="w-full appearance-none rounded-2xl border border-emerald-100/80 bg-white/70 px-4 py-3 font-bold text-slate-800 shadow-sm outline-none backdrop-blur-xl transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              >
                {locations.map((location) => (
                  <option key={location.name} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
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
                    <WeatherIcon type="cloud" />
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
                {baseMetrics.map((metric) => (
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
