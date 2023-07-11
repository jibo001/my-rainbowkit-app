import { useEffect } from "react"
import { useTranslation } from 'react-i18next';

export function useLocal() {
  const { i18n } = useTranslation()
  useEffect(() => {
    let lang
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang')
    } else {
      lang = navigator.language !== 'zh-CN' ? 'en-US' : 'zh-CN'
      localStorage.setItem('lang', lang)
    }
    i18n.changeLanguage(lang)
  }, [i18n])

  const setLang = (lang: string) => {
    localStorage.setItem('lang', lang)
    i18n.changeLanguage(lang)
  }

  const getLang = () => {
    return localStorage.getItem('lang')
  }

  return {
    setLang,
    getLang
  }
}