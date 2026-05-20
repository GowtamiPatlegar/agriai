import pests from '../data/pests.json'

export function retrievePestData(crop) {
  if (!crop || !pests[crop]) {
    return null
  }

  return {
    crop,
    ...pests[crop],
  }
}
