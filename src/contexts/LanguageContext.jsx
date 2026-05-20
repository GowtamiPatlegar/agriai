import { useCallback, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations'
import { uiTranslations } from '../data/uiTranslations'
import {
  defaultLanguage,
  LanguageContext,
  languageStorageKey,
  supportedLanguages,
} from './languageContextCore'

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function mergeTranslations(defaultTranslations, selectedTranslations = {}) {
  return Object.entries(defaultTranslations).reduce((merged, [key, defaultValue]) => {
    const selectedValue = selectedTranslations[key]

    if (Array.isArray(defaultValue)) {
      merged[key] = Array.isArray(selectedValue) ? selectedValue : defaultValue
      return merged
    }

    if (isPlainObject(defaultValue)) {
      merged[key] = mergeTranslations(defaultValue, isPlainObject(selectedValue) ? selectedValue : {})
      return merged
    }

    merged[key] = selectedValue ?? defaultValue
    return merged
  }, {})
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const savedLanguage = window.localStorage.getItem(languageStorageKey)

  return supportedLanguages.includes(savedLanguage) ? savedLanguage : defaultLanguage
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = useCallback((nextLanguage) => {
    if (!supportedLanguages.includes(nextLanguage)) {
      return
    }

    setLanguageState(nextLanguage)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  const value = useMemo(() => {
    const baseTranslations = mergeTranslations(
      translations[defaultLanguage],
      translations[language],
    )
    const baseUiTranslations = mergeTranslations(
      uiTranslations[defaultLanguage],
      uiTranslations[language] ?? {},
    )
    const enrichedUiTranslations = {
      ...baseUiTranslations,
      nav: {
        ...baseUiTranslations.nav,
        language: baseUiTranslations.nav.language ?? baseTranslations.language.eyebrow,
      },
      mobileNav: {
        ...baseUiTranslations.mobileNav,
        language: baseUiTranslations.mobileNav.language ?? baseTranslations.language.sampleBadge,
      },
      footer: {
        tagline: baseTranslations.hero.eyebrow,
        description: baseTranslations.hero.subtitle,
        note: baseTranslations.language.sampleTip,
        ...baseUiTranslations.footer,
      },
    }

    return {
      language,
      setLanguage,
      t: {
        ...baseTranslations,
        ui: enrichedUiTranslations,
      },
    }
  }, [language, setLanguage])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
