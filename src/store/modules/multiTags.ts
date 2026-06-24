import { defineStore } from 'pinia'
import {
  type multiType,
  type positionType,
  store,
  isUrl,
  isEqual,
  isNumber,
  isBoolean,
  getConfig,
  routerArrays,
  storageLocal,
  responsiveStorageNameSpace,
} from '../utils'
import { usePermissionStoreHook } from './permission'

export const useMultiTagsStore = defineStore({
  id: 'pure-multiTags',
  state: () => ({
    // 存储标签页信息（路由信息）
    multiTags: storageLocal().getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.multiTagsCache
      ? storageLocal().getItem<StorageConfigs>(`${responsiveStorageNameSpace()}tags`)
      : [...routerArrays, ...usePermissionStoreHook().flatteningRoutes.filter((v) => v?.meta?.fixedTag)],
    multiTagsCache: storageLocal().getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.multiTagsCache,
  }),
  getters: {
    getMultiTagsCache(state) {
      return state.multiTagsCache
    },
  },
  actions: {
    setTags(tags: multiType[]) {
      this.multiTags = tags
      this.tagsCache(this.multiTags)
    },
    multiTagsCacheChange(multiTagsCache: boolean) {
      this.multiTagsCache = multiTagsCache
      if (multiTagsCache) {
        storageLocal().setItem(`${responsiveStorageNameSpace()}tags`, this.multiTags)
      } else {
        storageLocal().removeItem(`${responsiveStorageNameSpace()}tags`)
      }
    },
    tagsCache(multiTags) {
      this.getMultiTagsCache && storageLocal().setItem(`${responsiveStorageNameSpace()}tags`, multiTags)
    },
    addTag(tag: multiType) {
      // 不添加到标签页
      if (tag?.meta?.hiddenTag) return
      // 如果是外链无需添加信息到标签页
      if (isUrl(tag?.name)) return
      // 如果title为空拒绝添加空信息到标签页
      if (tag?.meta?.title.length === 0) return
      // showLink:false 不添加到标签页
      if (isBoolean(tag?.meta?.showLink) && !tag?.meta?.showLink) return

      const tagPath = tag.path
      const tagHasExits = this.multiTags.some((item) => item.path === tagPath)
      const tagQueryHasExits = this.multiTags.some((item) => isEqual(item?.query, tag?.query))
      const tagParamsHasExits = this.multiTags.some((item) => isEqual(item?.params, tag?.params))

      if (tagHasExits && tagQueryHasExits && tagParamsHasExits) return

      const dynamicLevel = tag?.meta?.dynamicLevel ?? -1
      if (dynamicLevel > 0) {
        if (this.multiTags.filter((item) => item?.path === tagPath).length >= dynamicLevel) {
          const index = this.multiTags.findIndex((item) => item?.path === tagPath)
          if (index !== -1) {
            this.multiTags.splice(index, 1)
          }
        }
      }

      this.multiTags.push(tag)
      this.tagsCache(this.multiTags)

      if (getConfig()?.MaxTagsLevel && isNumber(getConfig().MaxTagsLevel)) {
        if (this.multiTags.length > getConfig().MaxTagsLevel) {
          this.multiTags.splice(1, 1)
        }
      }
    },
    removeTagByPath(path: string) {
      const index = this.multiTags.findIndex((tag) => tag.path === path)
      if (index === -1) return
      this.multiTags.splice(index, 1)
      this.tagsCache(this.multiTags)
      return this.multiTags
    },
    removeTagsByRange(position: positionType) {
      this.multiTags.splice(position?.startIndex, position?.length)
      this.tagsCache(this.multiTags)
      return this.multiTags
    },
    getLatestTag() {
      return this.multiTags.slice(-1)
    },
    handleTags<T>(mode: string, value?: T | multiType, position?: positionType): T {
      switch (mode) {
        case 'equal':
          this.setTags(value as multiType[])
          break
        case 'push':
          this.addTag(value as multiType)
          break
        case 'splice':
          if (!position) {
            return this.removeTagByPath(value as string) as T
          } else {
            return this.removeTagsByRange(position) as T
          }
        case 'slice':
          return this.getLatestTag() as T
      }
    },
  },
})

export function useMultiTagsStoreHook() {
  return useMultiTagsStore(store)
}
