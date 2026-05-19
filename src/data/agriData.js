export const features = [
  {
    title: 'Disease Detection',
    description:
      'Upload crop images and get fast AI-powered insights for early disease action across major crops.',
    icon: 'DI',
    gradient: 'from-emerald-500 to-lime-500',
  },
  {
    title: 'AI Farming Assistant',
    description:
      'Ask crop, soil, fertilizer, and irrigation questions with simple field-ready guidance.',
    icon: 'AI',
    gradient: 'from-emerald-600 to-lime-400',
  },
  {
    title: 'Weather Advisory',
    description:
      'Plan farm work with timely weather alerts, rainfall hints, and seasonal recommendations.',
    icon: 'WX',
    gradient: 'from-emerald-700 to-lime-400',
  },
  {
    title: 'Multilingual Support',
    description:
      'Use AgriAI comfortably across Telugu, Hindi, Tamil, Kannada, Malayalam, and Marathi.',
    icon: 'ML',
    gradient: 'from-lime-400 to-emerald-500',
  },
]

export const stats = [
  { value: '24/7', label: 'AI Support' },
  { value: '4+', label: 'Smart Tools' },
  { value: '100%', label: 'Mobile Ready' },
]

export const diseasePrediction = {
  diseaseName: 'Crop Stress or Disease Symptoms',
  confidence: 94,
  recommendation:
    'Remove heavily affected plant parts where appropriate, reduce unnecessary leaf wetness, and consult a local agriculture expert for crop-specific treatment.',
}

export const sampleMessages = [
  {
    id: 1,
    sender: 'farmer',
    text: 'My crop leaves have yellow spots. What should I check first?',
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Yellow spots can come from disease, nutrient stress, or water imbalance. Check recent weather, soil moisture, leaf pattern, and spread before choosing treatment.',
  },
  {
    id: 3,
    sender: 'farmer',
    text: 'How should I plan irrigation for rice, wheat, maize, or vegetables?',
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Use crop stage, soil type, and weather as the guide. Irrigate early morning or evening, avoid water stress during flowering, and reduce watering before expected rain.',
  },
  {
    id: 5,
    sender: 'farmer',
    text: 'How do I plan fertilizer after flowering or active growth?',
  },
  {
    id: 6,
    sender: 'ai',
    text: 'Match fertilizer to the crop and growth stage. Many crops need balanced nitrogen, phosphorus, and potassium, while fruiting vegetables and cotton often need careful potassium management.',
  },
]

export const weatherMetrics = [
  {
    label: 'Temperature',
    value: '29 C',
    note: 'Warm and stable',
    icon: 'sun',
    gradient: 'from-lime-300 to-emerald-500',
  },
  {
    label: 'Humidity',
    value: '74%',
    note: 'High moisture',
    icon: 'drop',
    gradient: 'from-emerald-300 to-emerald-600',
  },
  {
    label: 'Rainfall Chance',
    value: '68%',
    note: 'Likely evening rain',
    icon: 'cloud',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Wind Speed',
    value: '12 km/h',
    note: 'Light breeze',
    icon: 'wind',
    gradient: 'from-lime-500 to-green-500',
  },
]

export const recommendations = [
  'Delay pesticide spraying until rainfall chance drops below 30%.',
  'Check low-lying areas for waterlogging after evening showers.',
  'Use mulch, residue cover, or shallow cultivation where suitable to protect soil moisture.',
]

export const translations = {
  english: {
    badge: 'English',
    short: 'EN',
    title: 'Smart Farming Guidance',
    text: 'Check crop growth regularly, track soil moisture, and avoid spraying pesticides before rainfall.',
    tip: 'Tip: Healthy soil moisture helps roots absorb nutrients better.',
  },
  telugu: {
    badge: 'Telugu',
    short: 'TE',
    title: 'స్మార్ట్ వ్యవసాయ మార్గదర్శకం',
    text: 'పంటకు ఉదయం నీరు పెట్టండి, వారానికి రెండు సార్లు ఆకుల రంగును గమనించండి, వర్షం ముందు మందులు పిచికారీ చేయవద్దు.',
    tip: 'సూచన: సరైన నేల తేమ వేర్లు పోషకాలను బాగా గ్రహించడానికి సహాయపడుతుంది.',
  },
}
