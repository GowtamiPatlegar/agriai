import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AIProcessingLoader from '../components/AIProcessingLoader'
import UploadIcon from '../components/UploadIcon'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'
import { detectCropDisease } from '../services/diseaseDetectionService'
import { isImageFile } from '../utils/fileHelpers'

function DiseaseDetection() {
  const { t } = useLanguage()
  const diseaseText = t.disease
  const [imagePreview, setImagePreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const processingText = {
    title: diseaseText.analyzing,
    description: diseaseText.waitingText,
    steps: [diseaseText.uploadTitle, diseaseText.resultEyebrow, diseaseText.reportTitle],
    stepLabel: diseaseText.activeStepLabel ?? diseaseText.resultEyebrow,
  }

  function handleImage(file) {
    if (!isImageFile(file)) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
      setFileName(file.name)
      setSelectedFile(file)
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

  async function analyzeCropImage() {
    if (!selectedFile) {
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const prediction = await detectCropDisease(selectedFile)

      setResult(prediction)
    } catch (error) {
      console.error('Crop disease detection error:', error instanceof Error ? error.message : error)
      console.error('Full crop disease detection error object:', error)

      setResult({
        diseaseName: diseaseText.predictionName,
        confidence: 0,
        recommendation: diseaseText.recommendationText,
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="disease"
      className="scroll-section particle-field border-y border-emerald-100/80 bg-[radial-gradient(circle_at_top_right,#dcfce7,transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto max-w-6xl">
        <motion.div variants={cardReveal} className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {diseaseText.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            {diseaseText.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {diseaseText.subtitle}
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={cardReveal}
            className="glass-panel glow-card stagger-card rounded-[1.5rem] p-3 sm:rounded-[2rem] sm:p-5"
          >
            <label
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border-2 border-dashed p-4 text-center transition duration-300 sm:min-h-[360px] sm:rounded-[1.5rem] sm:p-6 lg:min-h-[420px] ${
                isDragging
                  ? 'scale-[1.01] border-emerald-500 bg-emerald-50/75 shadow-inner'
                  : 'border-emerald-200/80 bg-gradient-to-br from-white/75 to-emerald-50/55 shadow-inner shadow-white/50 backdrop-blur hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/10'
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
                  <div className={`scan-frame relative overflow-hidden rounded-3xl border bg-white/80 shadow-xl shadow-emerald-950/10 backdrop-blur transition duration-500 ${
                    isAnalyzing ? 'border-lime-300/80' : 'border-emerald-100/80'
                  }`}
                  >
                    <img
                      src={imagePreview}
                      alt="Uploaded crop preview"
                      className="aspect-[4/3] max-h-[60dvh] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <AnimatePresence>
                      {isAnalyzing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="pointer-events-none absolute inset-0"
                        >
                          <div className="absolute inset-0 bg-slate-950/30" />
                          <div className="scan-grid-overlay absolute inset-0 opacity-90" />
                          <div className="scan-corners absolute inset-0" />
                          <div className="scan-line absolute left-0 right-0 top-0 h-24 border-y border-lime-200/80 bg-gradient-to-b from-transparent via-lime-300/40 to-transparent shadow-[0_0_42px_rgba(190,242,100,0.78)]" />
                          <div className="absolute inset-4 rounded-2xl border border-lime-200/70 shadow-[0_0_42px_rgba(132,204,22,0.65),inset_0_0_30px_rgba(16,185,129,0.38)]" />
                          <div className="absolute left-4 top-4 rounded-full border border-lime-200/40 bg-slate-950/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-lime-200 shadow-lg shadow-lime-300/10 backdrop-blur">
                            {diseaseText.analyzing}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-left shadow-xl shadow-emerald-950/30 backdrop-blur">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-200">
                                {diseaseText.resultEyebrow}
                              </span>
                              <span className="h-2.5 w-2.5 rounded-full bg-lime-300 shadow-lg shadow-lime-300/70" />
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                              <div className="processing-bar h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="mt-5 text-sm font-bold text-emerald-700">
                    {fileName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {diseaseText.replaceHelp}
                  </p>
                </div>
              ) : (
                <div className="max-w-md">
                  <div className="animated-gradient mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-lime-500 text-white shadow-xl shadow-emerald-700/25 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <UploadIcon />
                  </div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {diseaseText.uploadTitle}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">
                    {diseaseText.uploadHelp}
                  </p>
                  <span className="button-lift mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/25 transition group-hover:bg-emerald-700">
                    {diseaseText.browse}
                  </span>
                </div>
              )}
            </label>

            <button
              type="button"
              onClick={analyzeCropImage}
              disabled={!imagePreview || isAnalyzing}
              className="button-lift animated-gradient mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isAnalyzing ? diseaseText.analyzing : diseaseText.analyze}
            </button>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="glass-panel-dark glow-card stagger-card rounded-[1.5rem] p-4 text-white [animation-delay:120ms] sm:rounded-[2rem] sm:p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                  {diseaseText.resultEyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-black">{diseaseText.reportTitle}</h2>
              </div>
              <span className="h-3 w-3 rounded-full bg-lime-300 shadow-lg shadow-lime-300/70" />
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing && <AIProcessingLoader key="loader" text={processingText} />}

              {!isAnalyzing && !result && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-5 text-center sm:min-h-[320px] sm:p-8 lg:min-h-[360px]"
              >
                <div className="mb-5 h-16 w-16 rounded-full border-4 border-emerald-300/30 border-t-lime-300" />
                <h3 className="text-2xl font-black">{diseaseText.waitingTitle}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {diseaseText.waitingText}
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
                  className="scan-success-pulse glass-inset rounded-3xl p-5 text-white"
                >
                  <p className="text-sm font-bold text-slate-300">
                    {diseaseText.diseaseName}
                  </p>
                  <p className="mt-2 text-2xl font-black text-lime-200">
                    {result.diseaseName || diseaseText.predictionName}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="glass-inset rounded-3xl p-5 text-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-slate-300">
                      {diseaseText.confidence}
                    </p>
                    <p className="text-2xl font-black text-white">
                      {result.confidence}%
                    </p>
                  </div>
                  <div className="mt-4 h-4 overflow-hidden rounded-full border border-white/10 bg-white/10 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ delay: 0.28, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="confidence-glow h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 transition-all duration-700"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="rounded-3xl border border-emerald-300/20 bg-emerald-400/15 p-5 shadow-inner shadow-emerald-200/5 backdrop-blur"
                >
                  <p className="text-sm font-bold text-lime-200">
                    {diseaseText.treatment}
                  </p>
                  <p className="mt-3 leading-7 text-emerald-50">
                    {result.recommendation || diseaseText.recommendationText}
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
