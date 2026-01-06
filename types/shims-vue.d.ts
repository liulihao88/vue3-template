import 'vue'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: any
    setStorage: any
    getStorage: any
    clearStorage: any
    validForm: any
    isEmpty: any
    notEmpty: any
    merge: any
    clone: any
    formatTime: any
    formatDurationTime: any
    uuid: any
    getType: any
    sleep: any
    validate: any
    asyncWrapper: any
    formatImg: any
    copy: any
    formatThousands: any
    toFixed: any
    log: any
    random: any
    toLine: any
    processWidth: any
    formatBytes: any
    formatBytesConvert: any
    throttle: any
    debounce: any
    confirm: any
    formatNewLines: any
    devConfirm: any

    // 本地
    $dev: any
    $mitt: any
  }
}
