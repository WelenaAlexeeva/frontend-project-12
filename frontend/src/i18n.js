import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import resources from './locales'

i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
