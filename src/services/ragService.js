import { retrieveCropData } from './cropService'
import { retrievePestData } from './pestService'
import { retrieveSeasonData } from './seasonService'
import { retrieveSoilData } from './soilService'

const contextCache = new Map()
const maxCacheEntries = 50

function normalize(value = '') {
  return value.toString().toLowerCase().trim()
}

function getCacheKey(query, options = {}) {
  return JSON.stringify({
    query: normalize(query),
    crop: normalize(options.crop),
    soil: normalize(options.soil),
    season: normalize(options.season),
    location: normalize(options.location),
    language: normalize(options.language),
  })
}

function setCache(key, value) {
  if (contextCache.size >= maxCacheEntries) {
    contextCache.delete(contextCache.keys().next().value)
  }

  contextCache.set(key, value)
}

function detectLocation(query = '') {
  const locationPattern = /\b(?:in|near|at|from)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,2})\b/
  const match = query.match(locationPattern)

  return match?.[1] ?? null
}

function removeAliases(entry) {
  if (!entry) {
    return null
  }

  const { aliases, relevanceScore, ...context } = entry
  return context
}

export function retrieveAgricultureContext(query, options = {}) {
  const cacheKey = getCacheKey(query, options)
  const cachedContext = contextCache.get(cacheKey)

  if (cachedContext) {
    return {
      ...cachedContext,
      cacheHit: true,
    }
  }

  const cropContext = retrieveCropData(`${options.crop ?? ''} ${query}`)
  const pestContext = retrievePestData(cropContext?.crop)
  const soilContext = retrieveSoilData(`${options.soil ?? ''} ${cropContext?.soil ?? ''} ${query}`)
  const seasonContext = retrieveSeasonData(`${options.season ?? ''} ${cropContext?.season ?? ''} ${query}`)
  const location = options.location ?? detectLocation(query)

  const context = {
    detected: {
      crop: cropContext?.crop ?? null,
      soil: soilContext?.soil ?? null,
      season: seasonContext?.season ?? null,
      location,
      language: options.language ?? null,
    },
    cropContext: removeAliases(cropContext),
    pestContext,
    soilContext: removeAliases(soilContext),
    seasonContext: removeAliases(seasonContext),
    weatherContext: options.weather ?? null,
    missing: {
      crop: !cropContext,
      soil: !soilContext,
      season: !seasonContext,
      location: !location,
      weather: !options.weather,
    },
    retrievalMeta: {
      source: 'local-json-mvp',
      strategy: 'keyword-scoring',
      vectorDbReady: true,
    },
    cacheHit: false,
  }

  setCache(cacheKey, context)

  return context
}

export function buildContextBlock(context) {
  return JSON.stringify(context, null, 2)
}
