import { diseasePrediction } from '../data/agriData'

const DEFAULT_DELAY = 1500

export function getDiseasePrediction(delay = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(diseasePrediction), delay)
  })
}

export function getChatbotResponse(delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'Thanks for the question. Based on general farming guidance, check crop symptoms, soil moisture, and local weather before taking action. For serious damage, consult a local agriculture officer.',
      )
    }, delay)
  })
}
