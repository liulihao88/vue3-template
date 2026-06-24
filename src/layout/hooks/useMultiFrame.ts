import type { Component } from 'vue'

const MAP = new Map<string, Component>()
type FrameEntry = [string, Component]

export const useMultiFrame = () => {
  function setMap(path: string, comp: Component) {
    MAP.set(path, comp)
  }

  function getMap(path: string): Component | undefined
  function getMap(): FrameEntry[]
  function getMap(path?: string) {
    if (path) {
      return MAP.get(path)
    }
    return [...MAP.entries()] as FrameEntry[]
  }

  function delMap(path: string) {
    MAP.delete(path)
  }

  return {
    setMap,
    getMap,
    delMap,
    MAP,
  }
}
