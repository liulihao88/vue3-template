import { ref, computed } from 'vue'
import { setStorage, getStorage } from '@oeos-components/utils'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export enum Language {
  ZH = '中文',
  EN = 'English',
}

const text = ref<Language>(Language.ZH)
const currentLocale = ref(zhCn) // 取消注释，定义实际的语言状态

const useLanguage = () => {
  if (getStorage('i18n-language') === 'en') {
    currentLocale.value = en
    text.value = Language.EN
  } else {
    currentLocale.value = zhCn
    text.value = Language.ZH
  }
  const changeLanguage = () => {
    console.log(`41 text.value`, text.value)
    if (text.value === Language.ZH) {
      currentLocale.value = en // 更新语言状态
      text.value = Language.EN
      setStorage('i18n-language', 'en') // 存储当前语言到 localStorage
    } else {
      currentLocale.value = zhCn // 更新语言状态
      text.value = Language.ZH
      setStorage('i18n-language', 'zh-cn') // 存储当前语言到 localStorage
    }
    console.log(`44 currentLocale.value`, currentLocale.value)
  }

  return {
    currentLocale,
    text,
    changeLanguage,
  }
}

export default useLanguage
