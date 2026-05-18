function HeroVisual() {
  return (
    <div className="float-soft relative mx-auto mt-10 max-w-md lg:mt-0">
      <div className="absolute inset-4 rounded-full bg-emerald-300/35 blur-3xl" />
      <div className="hero-leaf -left-4 top-10 hidden sm:grid" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19Zm0 0 8-8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="hero-leaf -right-2 bottom-24 hidden sm:grid [animation-delay:-3.5s]" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 16c7.5 1.5 13.2-1.8 16-9.5C12.3 5 6.6 8.3 4 16Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M4 16c7.5 1.5 13.2-1.8 16-9.5C12.3 5 6.6 8.3 4 16Zm0 0 9-5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="glass-panel glow-card relative rounded-[2rem] p-5">
        <div className="absolute -right-6 -top-8 hidden sm:block" aria-hidden="true">
          <div className="ai-orb-premium">
            <div className="ai-orb-core">
              <span className="text-xl font-black tracking-tight">AI</span>
            </div>
          </div>
        </div>

        <div className="animated-gradient rounded-[1.5rem] bg-gradient-to-br from-emerald-700 via-green-600 to-lime-500 p-5 text-white shadow-2xl shadow-emerald-950/15">
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              Live Farm Scan
            </span>
            <span className="h-3 w-3 rounded-full bg-lime-200 shadow-lg shadow-lime-100 pulse-soft" aria-hidden="true" />
          </div>

          <div className="space-y-4">
            <div className="glass-inset rounded-2xl p-4">
              <p className="text-sm text-emerald-50">Crop Health</p>
              <p className="mt-1 text-3xl font-black">92%</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-inset rounded-2xl p-4">
                <p className="text-sm text-emerald-50">Rain Chance</p>
                <p className="mt-1 text-2xl font-bold">68%</p>
              </div>
              <div className="glass-inset rounded-2xl p-4">
                <p className="text-sm text-emerald-50">Soil Status</p>
                <p className="mt-1 text-2xl font-bold">Good</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-100/80 bg-emerald-50/75 p-4 shadow-inner shadow-white/50 backdrop-blur">
          <p className="text-sm font-bold text-emerald-900">AI Suggestion</p>
          <p className="mt-1 text-sm leading-6 text-emerald-800">
            Irrigate after sunset and monitor lower leaves for early infection
            signs.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroVisual
