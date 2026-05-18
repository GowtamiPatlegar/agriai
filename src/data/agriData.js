export const features = [
  {
    title: 'Disease Detection',
    description:
      'Upload crop leaf images and get fast AI-powered insights for early disease action.',
    icon: 'DI',
    gradient: 'from-emerald-500 to-lime-500',
  },
  {
    title: 'AI Farming Assistant',
    description:
      'Ask crop, soil, fertilizer, and irrigation questions with simple field-ready guidance.',
    icon: 'AI',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Weather Advisory',
    description:
      'Plan farm work with timely weather alerts, rainfall hints, and seasonal recommendations.',
    icon: 'WX',
    gradient: 'from-sky-500 to-emerald-500',
  },
  {
    title: 'Multi-language Support',
    description:
      'Use AgriAI comfortably in Telugu, Hindi, Tamil, Kannada, Malayalam, and Marathi.',
    icon: 'TE',
    gradient: 'from-lime-500 to-yellow-400',
  },
]

export const stats = [
  { value: '24/7', label: 'AI Support' },
  { value: '4+', label: 'Smart Tools' },
  { value: '100%', label: 'Mobile Ready' },
]

export const diseasePrediction = {
  diseaseName: 'Tomato Leaf Blight',
  confidence: 94,
  recommendation:
    'Remove infected leaves, avoid overhead watering, and apply a copper-based organic fungicide in the evening.',
}

export const sampleMessages = [
  {
    id: 1,
    sender: 'farmer',
    text: 'My tomato leaves have yellow spots. What should I do?',
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Yellow spots can indicate early blight or nutrient stress. Remove affected leaves, avoid watering the leaves directly, and check soil drainage.',
  },
  {
    id: 3,
    sender: 'farmer',
    text: 'When is the best time to irrigate paddy fields?',
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Irrigate early morning or evening to reduce water loss. Keep shallow standing water during active growth, but drain before harvest.',
  },
  {
    id: 5,
    sender: 'farmer',
    text: 'Which fertilizer is good for chilli plants after flowering?',
  },
  {
    id: 6,
    sender: 'ai',
    text: 'After flowering, use balanced potassium-rich nutrition. Avoid excess nitrogen because it can increase leaves but reduce fruit quality.',
  },
]

export const weatherMetrics = [
  {
    label: 'Temperature',
    value: '29 C',
    note: 'Warm and stable',
    icon: 'sun',
    gradient: 'from-amber-400 to-lime-500',
  },
  {
    label: 'Humidity',
    value: '74%',
    note: 'High moisture',
    icon: 'drop',
    gradient: 'from-sky-400 to-emerald-500',
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
  'Mulch vegetable beds to protect soil moisture during warm hours.',
]

export const translations = {
  english: {
    badge: 'English',
    short: 'EN',
    title: 'Smart Farming Guidance',
    text: 'Water your crop early in the morning, monitor leaf color twice a week, and avoid spraying pesticides before rainfall.',
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
