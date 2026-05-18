const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY
const modelName = 'katanemo/Arch-Router-1.5B:hf-inference'
const apiUrl = 'https://router.huggingface.co/v1/chat/completions'

const farmingInstructions = `
You are AgriAI, a beginner-friendly farming assistant.
Answer only practical agriculture questions.
Help with crop diseases, irrigation, fertilizers, soil health, and weather advice.
Use simple language and give clear next steps.
If the crop damage is serious, tell the farmer to contact a local agriculture officer.
`

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

function getGeneratedText(data) {
  const chatMessage = data?.choices?.[0]?.message?.content

  if (chatMessage) {
    return chatMessage.trim()
  }

  const choiceText = data?.choices?.[0]?.text

  if (choiceText) {
    return choiceText.trim()
  }

  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim()
  }

  if (data?.generated_text) {
    return data.generated_text.trim()
  }

  if (typeof data === 'string') {
    return data.trim()
  }

  return ''
}

async function readErrorResponse(response) {
  const text = await response.text()

  try {
    const data = JSON.parse(text)
    return data.error || data.message || text
  } catch {
    return text
  }
}

function isNetworkOrCorsError(error) {
  return error instanceof TypeError && getErrorMessage(error).toLowerCase().includes('fetch')
}

function logHuggingFaceDebug(error, responseDetails) {
  console.group('Hugging Face API debug')
  console.log('Vite env available:', Boolean(import.meta.env))
  console.log('VITE_HUGGINGFACE_API_KEY loaded:', Boolean(apiKey))
  console.log('API key preview:', apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'missing')
  console.log('Hugging Face model:', modelName)
  console.log('Hugging Face endpoint:', apiUrl)

  if (responseDetails) {
    console.error('Hugging Face HTTP status:', responseDetails.status)
    console.error('Hugging Face HTTP status text:', responseDetails.statusText)
    console.error('Hugging Face response body:', responseDetails.body)
  }

  if (error) {
    console.error('Exact Hugging Face API error:', getErrorMessage(error))
    console.error('Full Hugging Face error object:', error)

    if (isNetworkOrCorsError(error)) {
      console.error(
        'This looks like a browser network/CORS failure. Confirm the Router endpoint is reachable and the API token is valid.',
      )
    }
  }

  console.groupEnd()
}

export async function getHuggingFaceChatbotResponse(question) {
  logHuggingFaceDebug()

  if (!apiKey) {
    throw new Error(
      'VITE_HUGGINGFACE_API_KEY is undefined. Add it to agriai/.env and restart the Vite dev server.',
    )
  }

  const prompt = `Farmer question: ${question}`

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: farmingInstructions.trim(),
          },
          {
            role: 'user',
            content: prompt.trim(),
          },
        ],
        max_tokens: 180,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const apiError = await readErrorResponse(response)
      logHuggingFaceDebug(undefined, {
        status: response.status,
        statusText: response.statusText,
        body: apiError,
      })
      throw new Error(`Hugging Face request failed (${response.status}): ${apiError}`)
    }

    const data = await response.json()
    const answer = getGeneratedText(data)

    if (!answer) {
      throw new Error(`Hugging Face returned an empty response: ${JSON.stringify(data)}`)
    }

    return answer
  } catch (error) {
    logHuggingFaceDebug(error)
    throw new Error(`Hugging Face request failed: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}
