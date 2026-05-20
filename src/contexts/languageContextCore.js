import { createContext } from 'react'
import { translations } from '../data/translations'

export const defaultLanguage = 'en'
export const languageStorageKey = 'agriai-language'
export const supportedLanguages = Object.keys(translations)
export const LanguageContext = createContext(null)
