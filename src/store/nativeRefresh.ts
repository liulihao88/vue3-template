import { defineStore } from 'pinia'
import { nextTick } from 'vue'

const useNativeRefresh = defineStore('nativeRefresh', {
  state: () => ({
    refresh: true,
  }),

  actions: {
    refreshHandler() {
      this.refresh = false
      nextTick(() => {
        console.clear()
        this.refresh = true
        console.log(`223 this.refresh`, this.refresh)
        console.log(`1151 12行 src/store/nativeRefresh.ts console `, console)
      })
    },
  },
})

export default useNativeRefresh
