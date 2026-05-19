import WeatherAdvisory from '../sections/WeatherAdvisory'

export default function WeatherPage({ t }) {
  return <WeatherAdvisory t={t.weather} />
}
