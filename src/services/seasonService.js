import seasons from '../data/season.json'

function normalize(value = '') {
  return value.toString().toLowerCase().trim()
}

function tokenize(value = '') {
  return normalize(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

function scoreEntry(query, season, entry) {
  const normalizedQuery = normalize(query)
  const queryTokens = new Set(tokenize(query))
  const searchableValues = [
    season,
    ...(entry.aliases ?? []),
    entry.months,
    entry.logic,
    ...(entry.recommended_crops ?? []),
    entry.advice,
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

export function retrieveSeasonData(seasonOrQuery) {
  const matches = Object.entries(seasons)
    .map(([season, data]) => ({
      season,
      ...data,
      relevanceScore: scoreEntry(seasonOrQuery, season, data),
    }))
    .filter((entry) => entry.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)

  return matches[0] ?? null
}
