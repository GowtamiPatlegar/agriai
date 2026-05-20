import { useLanguage } from '../contexts/useLanguage'
import WeatherAdvisory from '../sections/WeatherAdvisory'

export default function WeatherPage() {
  const { t } = useLanguage()

  return <WeatherAdvisory aria-label={t.weather.eyebrow} />
}
