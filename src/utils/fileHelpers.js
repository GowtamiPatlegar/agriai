export function isImageFile(file) {
  return Boolean(file && file.type.startsWith('image/'))
}
