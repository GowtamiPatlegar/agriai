import { getHuggingFaceChatbotResponse } from '../services/huggingFaceService'

export async function handleAgricultureChat({
  message,
  language,
  crop,
  soil,
  season,
  location,
  weather,
} = {}) {
  if (!message?.trim()) {
    throw new Error('Message is required to generate an agriculture response.')
  }

  return getHuggingFaceChatbotResponse(message, language, {
    crop,
    soil,
    season,
    location,
    weather,
  })
}
