import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AIProcessingLoader from '../components/AIProcessingLoader'
import UploadIcon from '../components/UploadIcon'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { getDiseasePrediction } from '../services/mockAiService'
import { isImageFile } from '../utils/fileHelpers'

function DiseaseDetection({ t }) {
  const [imagePreview, setImagePreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  function handleImage(file) {
    if (!isImageFile(file)) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
      setFileName(file.name)
      setResult(null)
    }

    reader.readAsDataURL(file)
  }

  function handleFileChange(event) {
    handleImage(event.target.files[0])
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    handleImage(event.dataTransfer.files[0])
  }

  async function analyzeLeaf() {
    if (!imagePreview) {
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    const prediction = await getDiseasePrediction()

    setResult(prediction)
    setIsAnalyzing(false)
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="particle-field border-y border-emerald-100/80 bg-[radial-gradient(circle_at_top_right,#dcfce7,transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-20 text-slate-900 sm:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto max-w-6xl">
        <motion.div variants={cardReveal} className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={cardReveal}
            className="glow-card stagger-card rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-2xl shadow-emerald-950/10 backdrop-blur"
          >
            <label
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-[420px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-6 text-center transition duration-300 ${
                isDragging
                  ? 'scale-[1.01] border-emerald-500 bg-emerald-50 shadow-inner'
                  : 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/70 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/10'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />

              {imagePreview ? (
                <div className="w-full">
                  <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">
                    <img
                      src={imagePreview}
                      alt="Uploaded leaf preview"
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-96"
                    />
                    <AnimatePresence>
                      {isAnalyzing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="pointer-events-none absolute inset-0"
                        >
                          <div className="absolute inset-0 bg-emerald-950/15" />
                          <motion.div
                            initial={{ y: '-20%' }}
                            animate={{ y: '125%' }}
                            transition={{
                              duration: 1.35,
                              ease: 'easeInOut',
                              repeat: Infinity,
                            }}
                            className="absolute left-0 right-0 top-0 h-20 border-y border-lime-200/80 bg-gradient-to-b from-transparent via-lime-300/35 to-transparent shadow-[0_0_36px_rgba(190,242,100,0.7)]"
                          />
                          <div className="absolute inset-4 rounded-2xl border border-lime-200/70 shadow-[0_0_34px_rgba(132,204,22,0.55),inset_0_0_26px_rgba(16,185,129,0.35)]" />
                          <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/75 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-lime-200 backdrop-blur">
                            AI Scan Active
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="mt-5 text-sm font-bold text-emerald-700">
                    {fileName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.replaceHelp}
                  </p>
                </div>
              ) : (
                <div className="max-w-md">
                  <div className="animated-gradient mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-lime-500 text-white shadow-xl shadow-emerald-700/25 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <UploadIcon />
                  </div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {t.uploadTitle}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">
                    {t.uploadHelp}
                  </p>
                  <span className="button-lift mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/25 transition group-hover:bg-emerald-700">
                    {t.browse}
                  </span>
                </div>
              )}
            </label>

            <button
              type="button"
              onClick={analyzeLeaf}
              disabled={!imagePreview || isAnalyzing}
              className="button-lift animated-gradient mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isAnalyzing ? t.analyzing : t.analyze}
            </button>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="glow-card stagger-card rounded-[2rem] border border-white/80 bg-slate-950 p-6 text-white shadow-2xl shadow-emerald-950/20 [animation-delay:120ms]"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                  {t.resultEyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-black">{t.reportTitle}</h2>
              </div>
              <span className="h-3 w-3 rounded-full bg-lime-300 shadow-lg shadow-lime-300/70" />
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing && <AIProcessingLoader key="loader" />}

              {!isAnalyzing && !result && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <div className="mb-5 h-16 w-16 rounded-full border-4 border-emerald-300/30 border-t-lime-300" />
                <h3 className="text-2xl font-black">{t.waitingTitle}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {t.waitingText}
                </p>
              </motion.div>
              )}

              {!isAnalyzing && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  staggerChildren: 0.09,
                }}
                className="space-y-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"
                >
                  <p className="text-sm font-bold text-slate-300">
                    {t.diseaseName}
                  </p>
                  <p className="mt-2 text-2xl font-black text-lime-200">
                    {t.predictionName || result.diseaseName}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-slate-300">
                      {t.confidence}
                    </p>
                    <p className="text-2xl font-black text-white">
                      {result.confidence}%
                    </p>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ delay: 0.28, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-lime-300 to-emerald-400 transition-all duration-700"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="rounded-3xl bg-emerald-400/15 p-5 ring-1 ring-emerald-300/20"
                >
                  <p className="text-sm font-bold text-lime-200">
                    {t.treatment}
                  </p>
                  <p className="mt-3 leading-7 text-emerald-50">
                    {t.recommendationText || result.recommendation}
                  </p>
                </motion.div>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default DiseaseDetection
