import { useState } from 'react'
import { motion } from 'framer-motion'
import { cardReveal, sectionReveal, viewportSettings } from './motionVariants'

const prediction = {
  diseaseName: 'Tomato Leaf Blight',
  confidence: 94,
  recommendation:
    'Remove infected leaves, avoid overhead watering, and apply a copper-based organic fungicide in the evening.',
}

function UploadIcon() {
  return (
    <svg
      className="h-10 w-10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 16V5m0 0-4 4m4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AIProcessingLoader() {
  const steps = ['Scanning leaf texture', 'Detecting spot patterns', 'Matching crop model']

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col items-center text-center">
        <div className="ai-orbit relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-400/10">
          <div className="scan-beam absolute inset-4 rounded-full" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-300 text-slate-950 shadow-xl shadow-emerald-400/20">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 4v16M6 8h12M6 16h12M8 4l-2 4 2 4-2 4 2 4M16 4l2 4-2 4 2 4-2 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-black">AI is analyzing your leaf</h3>
        <p className="mt-2 max-w-sm leading-7 text-slate-300">
          Extracting visual symptoms and comparing them with sample crop disease
          patterns.
        </p>
      </div>

      <div className="mt-7 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-200">{step}</span>
              <span className="text-xs font-black text-lime-200">
                Step {index + 1}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="processing-bar h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300"
                style={{ animationDelay: `${index * 180}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DiseaseDetection() {
  const [imagePreview, setImagePreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  function handleImage(file) {
    if (!file || !file.type.startsWith('image/')) {
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

  function analyzeLeaf() {
    if (!imagePreview) {
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      setIsAnalyzing(false)
      setResult(prediction)
    }, 1200)
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
            Disease Detection
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Upload a leaf image for an instant AI crop health check.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Drag and drop a crop leaf photo, preview it, and run a sample AI
            analysis with disease confidence and treatment guidance.
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
                  <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">
                    <img
                      src={imagePreview}
                      alt="Uploaded leaf preview"
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-96"
                    />
                  </div>
                  <p className="mt-5 text-sm font-bold text-emerald-700">
                    {fileName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Click or drop another image to replace this preview.
                  </p>
                </div>
              ) : (
                <div className="max-w-md">
                  <div className="animated-gradient mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-lime-500 text-white shadow-xl shadow-emerald-700/25 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <UploadIcon />
                  </div>
                  <h2 className="text-2xl font-black text-slate-950">
                    Drop leaf image here
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">
                    Supports JPG, PNG, and WEBP images. A clear leaf photo gives
                    better AI predictions.
                  </p>
                  <span className="button-lift mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/25 transition group-hover:bg-emerald-700">
                    Browse Image
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
              {isAnalyzing ? 'Analyzing Leaf...' : 'Analyze Leaf Image'}
            </button>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="glow-card stagger-card rounded-[2rem] border border-white/80 bg-slate-950 p-6 text-white shadow-2xl shadow-emerald-950/20 [animation-delay:120ms]"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                  AI Result
                </p>
                <h2 className="mt-2 text-3xl font-black">Prediction Report</h2>
              </div>
              <span className="h-3 w-3 rounded-full bg-lime-300 shadow-lg shadow-lime-300/70" />
            </div>

            {isAnalyzing && (
              <AIProcessingLoader />
            )}

            {!isAnalyzing && !result && (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="mb-5 h-16 w-16 rounded-full border-4 border-emerald-300/30 border-t-lime-300" />
                <h3 className="text-2xl font-black">Waiting for analysis</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Upload a leaf image and tap analyze to generate a sample AI
                  disease prediction.
                </p>
              </div>
            )}

            {!isAnalyzing && result && (
              <div className="space-y-5">
                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold text-slate-300">
                    Disease Name
                  </p>
                  <p className="mt-2 text-2xl font-black text-lime-200">
                    {result.diseaseName}
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-slate-300">
                      Confidence
                    </p>
                    <p className="text-2xl font-black text-white">
                      {result.confidence}%
                    </p>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lime-300 to-emerald-400 transition-all duration-700"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-3xl bg-emerald-400/15 p-5 ring-1 ring-emerald-300/20">
                  <p className="text-sm font-bold text-lime-200">
                    Treatment Recommendation
                  </p>
                  <p className="mt-3 leading-7 text-emerald-50">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default DiseaseDetection
