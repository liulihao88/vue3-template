import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: any
    setStorage: any
    getStorage: any
    clearStorage: any
    validForm: any
    isEmpty: any
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
    getVariable: any
    throttle: any
    debounce: any
    confirm: any
    formatNewLines: any
    devConfirm: any
    $dev: any
    $mitt: any
  }
}
