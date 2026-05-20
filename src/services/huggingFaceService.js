import { buildContextBlock, retrieveAgricultureContext } from './ragService'

const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY
const modelName = 'katanemo/Arch-Router-1.5B:hf-inference'
const apiUrl = 'https://router.huggingface.co/v1/chat/completions'

const defaultLanguage = 'en'
const languageInstructions = {
  en: {
    name: 'English',
    replyInstruction: 'Reply ONLY in English.',
  },
  te: {
    name: 'Telugu',
    replyInstruction: 'Reply ONLY in Telugu.',
  },
  hi: {
    name: 'Hindi',
    replyInstruction: 'Reply ONLY in Hindi.',
  },
  ta: {
    name: 'Tamil',
    replyInstruction: 'Reply ONLY in Tamil.',
  },
  kn: {
    name: 'Kannada',
    replyInstruction: 'Reply ONLY in Kannada.',
  },
  ml: {
    name: 'Malayalam',
    replyInstruction: 'Reply ONLY in Malayalam.',
  },
  mr: {
    name: 'Marathi',
    replyInstruction: 'Reply ONLY in Marathi.',
  },
}

const scriptLanguageMap = [
  { language: 'te', pattern: /[\u0C00-\u0C7F]/ },
  { language: 'hi', pattern: /[\u0900-\u097F]/ },
  { language: 'ta', pattern: /[\u0B80-\u0BFF]/ },
  { language: 'kn', pattern: /[\u0C80-\u0CFF]/ },
  { language: 'ml', pattern: /[\u0D00-\u0D7F]/ },
]

const actionableSummaryLabels = {
  en: 'Actionable Summary',
  te: 'చర్యల సారాంశం',
  hi: 'कार्रवाई सारांश',
  ta: 'செயல் சுருக்கம்',
  kn: 'ಕಾರ್ಯ ಸಾರಾಂಶ',
  ml: 'നടപടി ചുരുക്കം',
  mr: 'कृती सारांश',
}

const summaryFallbackLines = {
  en: 'Follow the key steps above and share crop, soil, location, season, or weather details for more precise advice.',
  te: 'పై ముఖ్యమైన చర్యలను పాటించండి. మరింత ఖచ్చితమైన సలహా కోసం పంట, నేల, ప్రదేశం, సీజన్ లేదా వాతావరణ వివరాలు పంపండి.',
  hi: 'ऊपर दिए गए मुख्य कदम अपनाएं। अधिक सटीक सलाह के लिए फसल, मिट्टी, स्थान, मौसम या ऋतु की जानकारी भेजें।',
  ta: 'மேலே உள்ள முக்கிய செயல்களைப் பின்பற்றுங்கள். மேலும் துல்லியமான ஆலோசனைக்கு பயிர், மண், இடம், பருவம் அல்லது வானிலை விவரங்களைப் பகிரவும்.',
  kn: 'ಮೇಲಿನ ಮುಖ್ಯ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ. ಇನ್ನಷ್ಟು ನಿಖರ ಸಲಹೆಗೆ ಬೆಳೆ, ಮಣ್ಣು, ಸ್ಥಳ, ಋತು ಅಥವಾ ಹವಾಮಾನ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
  ml: 'മുകളിൽ പറഞ്ഞ പ്രധാന നടപടികൾ പാലിക്കുക. കൂടുതൽ കൃത്യമായ ഉപദേശത്തിനായി വിള, മണ്ണ്, സ്ഥലം, സീസൺ അല്ലെങ്കിൽ കാലാവസ്ഥ വിവരങ്ങൾ പങ്കിടുക.',
  mr: 'वरील मुख्य उपाय पाळा. अधिक अचूक सल्ल्यासाठी पीक, माती, ठिकाण, हंगाम किंवा हवामानाची माहिती पाठवा.',
}

const farmingInstructions = `
You are AgriAI, an advanced AI-powered agricultural decision support assistant for farmers globally, especially in India.
Give accurate, practical, context-aware farming guidance using crop science, weather, soil knowledge, and seasonal farming patterns.
Answer only agriculture-related questions.
Use simple, farmer-friendly language and explain any technical term briefly.
Focus on what the farmer should do next, not theory.
When relevant, consider season, weather, crop type, soil type, location, and crop growth stage.
Include practical guidance on sowing, irrigation, fertilization, harvest timing, pest risk, disease risk, soil care, and crop suitability when useful.
If weather data is available, adjust advice for rainfall, temperature, humidity, storms, heatwaves, drought, or heavy rain.
If crop, soil, or location details are available, personalize the answer for that context and region.
Keep answers short, clear, and structured. Use bullets when helpful.
Always end with a simple actionable summary.
Be supportive and specific. Do not be vague.
Do not provide unrelated information.
Do not respond in multiple languages at once.
Do not provide harmful chemical misuse instructions.
For pesticides, fertilizers, and chemicals, give only general safe guidance and tell the farmer to follow product labels and local agriculture officer advice.
If the crop damage is serious, tell the farmer to contact a local agriculture officer.
`

function getLanguageInstruction(language = defaultLanguage) {
  return languageInstructions[language] ?? languageInstructions[defaultLanguage]
}

function detectLanguageFromText(text = '') {
  const detectedLanguage = scriptLanguageMap.find(({ pattern }) => pattern.test(text))

  return detectedLanguage?.language ?? defaultLanguage
}

function resolveLanguage(language, question) {
  return languageInstructions[language] ? language : detectLanguageFromText(question)
}

function getSystemPrompt(language, agricultureContext) {
  const languageInstruction = getLanguageInstruction(language)
  const summaryLabel = actionableSummaryLabels[language] ?? actionableSummaryLabels[defaultLanguage]

  return `
${farmingInstructions.trim()}
${languageInstruction.replyInstruction}
Do not switch to English unless the selected language is English.
If the farmer asks in another language, still answer in ${languageInstruction.name}.
Use the retrieved agriculture context below before using general model knowledge.
Never invent missing agriculture facts. If crop, soil, season, location, or weather context is missing and needed, ask ONE clear follow-up question.
If retrieved context is available, ground your answer in it and mention practical next steps.
Consider crop, soil, season, pest risk, location, and weather if present.
Always end with a final section titled "${summaryLabel}".

Retrieved agriculture context:
${buildContextBlock(agricultureContext)}
`.trim()
}

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

function logRagDebug(agricultureContext) {
  console.group('AgriAI RAG debug')
  console.log('Detected context:', agricultureContext.detected)
  console.log('Missing context:', agricultureContext.missing)
  console.log('Retrieval meta:', agricultureContext.retrievalMeta)
  console.log('Cache hit:', agricultureContext.cacheHit)
  console.groupEnd()
}

function postProcessResponse(answer, language) {
  const summaryLabel = actionableSummaryLabels[language] ?? actionableSummaryLabels[defaultLanguage]
  const summaryFallback = summaryFallbackLines[language] ?? summaryFallbackLines[defaultLanguage]

  if (answer.toLowerCase().includes(summaryLabel.toLowerCase())) {
    return answer
  }

  return `${answer.trim()}\n\n${summaryLabel}\n- ${summaryFallback}`
}

export async function getHuggingFaceChatbotResponse(question, language = defaultLanguage, contextOptions = {}) {
  const resolvedLanguage = resolveLanguage(language, question)
  const agricultureContext = retrieveAgricultureContext(question, {
    ...contextOptions,
    language: resolvedLanguage,
  })

  logHuggingFaceDebug()
  logRagDebug(agricultureContext)

  if (!apiKey) {
    throw new Error(
      'VITE_HUGGINGFACE_API_KEY is undefined. Add it to agriai/.env and restart the Vite dev server.',
    )
  }

  const languageInstruction = getLanguageInstruction(resolvedLanguage)
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
            content: getSystemPrompt(resolvedLanguage, agricultureContext),
          },
          {
            role: 'user',
            content: `
${languageInstruction.replyInstruction}
Use retrieved context first. Ask one follow-up question if required facts are missing.
${prompt}
`.trim(),
          },
        ],
        max_tokens: 320,
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

    return postProcessResponse(answer, resolvedLanguage)
  } catch (error) {
    logHuggingFaceDebug(error)
    throw new Error(`Hugging Face request failed: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}
