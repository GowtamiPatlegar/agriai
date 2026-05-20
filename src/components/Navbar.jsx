import { useLanguage } from '../contexts/useLanguage'

function Navbar() {
  const { t } = useLanguage()
  const navText = t.nav

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <a href="#" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl animated-gradient glow-strong gpu-accel text-sm font-black text-white shadow-lg shadow-emerald-700/20">
          AI
        </span>
        <span className="text-2xl font-bold tracking-tight text-slate-950">
          AgriAI
        </span>
      </a>

      <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
        <a className="transition hover:text-emerald-700" href="#features">
          {navText.features}
        </a>
        <a className="transition hover:text-emerald-700" href="#assistant">
          {navText.assistant}
        </a>
        <a className="transition hover:text-emerald-700" href="#advisory">
          {navText.advisory}
        </a>
      </div>

      <a
        href="#features"
        className="button-lift smooth-transition micro-hover rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        {navText.getStarted}
      </a>
    </nav>
  )
}

export default Navbar
