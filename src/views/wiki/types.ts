export type FileKind = 'doc' | 'sheet' | 'image' | 'markdown'

export type WikiNode = {
  id: string
  title: string
  kind: FileKind | 'folder'
  children?: WikiNode[]
  content?: string
  updated?: string
}
