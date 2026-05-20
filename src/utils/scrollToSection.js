export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)

  if (!section) {
    return
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${sectionId}`)
}

export function handleSectionLinkClick(event, sectionId) {
  event.preventDefault()
  scrollToSection(sectionId)
}
