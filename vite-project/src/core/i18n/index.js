import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from './locales/en.json'
import translationVi from './locales/vi.json'

export const resources = {
    en: {
        translation: translationEn,
    },
    vi: {
        translation: translationVi,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n;