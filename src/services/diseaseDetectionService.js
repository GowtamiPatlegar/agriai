const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY
const modelName = 'linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification'
const apiUrl = `https://router.huggingface.co/hf-inference/models/${modelName}`

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

function logDiseaseDetectionDebug(error, responseDetails) {
  console.group('Hugging Face disease detection debug')
  console.log('Vite env available:', Boolean(import.meta.env))
  console.log('VITE_HUGGINGFACE_API_KEY loaded:', Boolean(apiKey))
  console.log('API key preview:', apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'missing')
  console.log('Image classification model:', modelName)
  console.log('Hugging Face endpoint:', apiUrl)

  if (responseDetails) {
    console.error('Hugging Face HTTP status:', responseDetails.status)
    console.error('Hugging Face HTTP status text:', responseDetails.statusText)
    console.error('Hugging Face response body:', responseDetails.body)
  }

  if (error) {
    console.error('Exact disease detection error:', getErrorMessage(error))
    console.error('Full disease detection error object:', error)
  }

  console.groupEnd()
}

async function readResponseBody(response) {
  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function canvasToJpegBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
          return
        }

        reject(new Error('Could not convert the image to JPEG before upload.'))
      },
      'image/jpeg',
      0.92,
    )
  })
}

async function convertImageToRgbJpegBlob(imageFile) {
  if (!window.createImageBitmap || !document.createElement) {
    return imageFile
  }

  const imageBitmap = await window.createImageBitmap(imageFile)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = imageBitmap.width
  canvas.height = imageBitmap.height

  if (!context) {
    imageBitmap.close()
    throw new Error('Could not prepare the image for disease detection.')
  }

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(imageBitmap, 0, 0)
  imageBitmap.close()

  return canvasToJpegBlob(canvas)
}

function normalizeLabel(label) {
  return label
    .replace(/___/g, ' - ')
    .replace(/__/g, ' - ')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getRecommendation(diseaseName) {
  const lowerName = diseaseName.toLowerCase()

  if (lowerName.includes('healthy')) {
    return 'The leaf looks healthy. Keep monitoring the crop, maintain balanced watering, and continue regular field checks.'
  }

  if (lowerName.includes('blight')) {
    return 'Remove badly affected leaves, avoid overhead watering, improve airflow, and contact a local agriculture officer for the right fungicide and dosage.'
  }

  if (lowerName.includes('rust')) {
    return 'Remove infected leaves, avoid wet foliage, improve spacing, and ask a local agriculture expert about a suitable rust-control spray.'
  }

  if (lowerName.includes('mildew') || lowerName.includes('mold')) {
    return 'Reduce leaf wetness, improve ventilation, avoid evening overhead irrigation, and use expert-recommended treatment if the infection spreads.'
  }

  if (lowerName.includes('spot')) {
    return 'Remove infected leaves, keep the field clean, avoid splashing soil onto leaves, and check with an agriculture officer for disease-specific treatment.'
  }

  if (lowerName.includes('virus') || lowerName.includes('mosaic')) {
    return 'Remove severely infected plants, control insect vectors such as whiteflies or aphids, and use disease-free seeds or seedlings next season.'
  }

  return 'Isolate affected plants if possible, remove heavily damaged leaves, avoid overwatering, and consult a local agriculture officer for crop-specific treatment.'
}

function getBestPrediction(data) {
  const predictions = Array.isArray(data) ? data : data?.predictions

  if (!Array.isArray(predictions) || predictions.length === 0) {
    throw new Error(`Unexpected Hugging Face response: ${JSON.stringify(data)}`)
  }

  const bestPrediction = predictions.reduce((best, current) => {
    const currentScore = Number(current.score ?? current.confidence ?? 0)
    const bestScore = Number(best.score ?? best.confidence ?? 0)

    return currentScore > bestScore ? current : best
  }, predictions[0])

  const label = bestPrediction.label || bestPrediction.class || bestPrediction.name

  if (!label) {
    throw new Error(`Prediction did not include a disease label: ${JSON.stringify(bestPrediction)}`)
  }

  const confidence = Math.round(Number(bestPrediction.score ?? bestPrediction.confidence ?? 0) * 100)
  const diseaseName = normalizeLabel(label)

  return {
    diseaseName,
    confidence: Math.min(Math.max(confidence, 0), 100),
    recommendation: getRecommendation(diseaseName),
  }
}

export async function detectCropDisease(imageFile) {
  logDiseaseDetectionDebug()

  if (!apiKey) {
    throw new Error(
      'VITE_HUGGINGFACE_API_KEY is undefined. Add it to agriai/.env and restart the Vite dev server.',
    )
  }

  if (!imageFile) {
    throw new Error('No image file was provided for disease detection.')
  }

  if (!imageFile.type?.startsWith('image/')) {
    throw new Error('Please upload a valid image file such as JPG, PNG, or WEBP.')
  }

  try {
    const imageBlob = await convertImageToRgbJpegBlob(imageFile)
    const imageBytes = await imageBlob.arrayBuffer()

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': imageBlob.type || 'image/jpeg',
      },
      body: imageBytes,
    })

    const responseBody = await readResponseBody(response)

    if (!response.ok) {
      logDiseaseDetectionDebug(undefined, {
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      })

      const apiError =
        typeof responseBody === 'string'
          ? responseBody
          : responseBody.error || responseBody.message || JSON.stringify(responseBody)

      throw new Error(`Hugging Face disease detection failed (${response.status}): ${apiError}`)
    }

    return getBestPrediction(responseBody)
  } catch (error) {
    logDiseaseDetectionDebug(error)
    throw new Error(`Disease detection request failed: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}
