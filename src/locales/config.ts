import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh_cn from './zh-CN.json'
import en from './en-US.json'
import zh_tw from './zh-TW.json'

const resources = {
  "zh-CN": {
    translation: zh_cn
  },
  "en-US": {
    translation: en
  },
  "zh-TW": {
    translation: zh_tw
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
