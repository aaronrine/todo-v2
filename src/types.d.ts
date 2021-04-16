export type Todo = {
  id?: string | number
  text: string
  priority: number
  index: number
  marked: boolean
}

export interface DragItem {
  index: number
  id: string
  type: string
}

