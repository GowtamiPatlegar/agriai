function HeroVisual() {
  return (
    <div className="float-soft relative mx-auto mt-10 max-w-md lg:mt-0">
      <div className="absolute inset-6 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl shadow-emerald-950/15 backdrop-blur">
        <div className="animated-gradient rounded-[1.5rem] bg-gradient-to-br from-emerald-700 via-green-600 to-lime-500 p-5 text-white">
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              Live Farm Scan
            </span>
            <span className="h-3 w-3 rounded-full bg-lime-200 shadow-lg shadow-lime-100 pulse-soft" aria-hidden="true" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white/18 p-4 backdrop-blur">
              <p className="text-sm text-emerald-50">Crop Health</p>
              <p className="mt-1 text-3xl font-black">92%</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/18 p-4">
                <p className="text-sm text-emerald-50">Rain Chance</p>
                <p className="mt-1 text-2xl font-bold">68%</p>
              </div>
              <div className="rounded-2xl bg-white/18 p-4">
                <p className="text-sm text-emerald-50">Soil Status</p>
                <p className="mt-1 text-2xl font-bold">Good</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
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
