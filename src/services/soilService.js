import soils from '../data/soil.json'

function normalize(value = '') {
  return value.toString().toLowerCase().trim()
}

function tokenize(value = '') {
  return normalize(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

function scoreEntry(query, soil, entry) {
  const normalizedQuery = normalize(query)
  const queryTokens = new Set(tokenize(query))
  const searchableValues = [
    soil,
    ...(entry.aliases ?? []),
    ...(entry.best_crops ?? []),
    entry.notes,
  ].filter(Boolean)

  return searchableValues.reduce((score, value) => {
    const normalizedValue = normalize(value)

    if (normalizedQuery.includes(normalizedValue)) {
      return score + 8
    }

    return score + tokenize(value).reduce((tokenScore, token) => (
      queryTokens.has(token) ? tokenScore + 2 : tokenScore
    ), 0)
  }, 0)
}

export function retrieveSoilData(soilOrQuery) {
  const matches = Object.entries(soils)
    .map(([soil, data]) => ({
      soil,
      ...data,
      relevanceScore: scoreEntry(soilOrQuery, soil, data),
    }))
    .filter((entry) => entry.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)

  return matches[0] ?? null
}
