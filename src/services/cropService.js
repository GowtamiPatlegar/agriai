import crops from '../data/crops.json'

function normalize(value = '') {
  return value.toString().toLowerCase().trim()
}

function tokenize(value = '') {
  return normalize(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

function scoreEntry(query, key, entry) {
  const normalizedQuery = normalize(query)
  const queryTokens = new Set(tokenize(query))
  const searchableValues = [
    key,
    ...(entry.aliases ?? []),
    entry.season,
    entry.soil,
    entry.water,
    entry.growth_notes,
    ...(entry.pests ?? []),
  ].filter(Boolean)

  return searchableValues.reduce((score, value) => {
    const normalizedValue = normalize(value)
    const valueTokens = tokenize(value)

    if (normalizedQuery.includes(normalizedValue)) {
      return score + 8
    }

    return score + valueTokens.reduce((tokenScore, token) => (
      queryTokens.has(token) ? tokenScore + 2 : tokenScore
    ), 0)
  }, 0)
}

export function getCropNames() {
  return Object.keys(crops)
}

export function retrieveCropData(query) {
  const matches = Object.entries(crops)
    .map(([crop, data]) => ({
      crop,
      ...data,
      relevanceScore: scoreEntry(query, crop, data),
    }))
    .filter((entry) => entry.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)

  return matches[0] ?? null
}

export function findCropByName(cropName) {
  const normalizedCrop = normalize(cropName)

  if (!normalizedCrop) {
    return null
  }

  const match = Object.entries(crops).find(([crop, data]) => (
    normalize(crop) === normalizedCrop
    || (data.aliases ?? []).some((alias) => normalize(alias) === normalizedCrop)
  ))

  if (!match) {
    return null
  }

  const [crop, data] = match
  return { crop, ...data, relevanceScore: 10 }
}
