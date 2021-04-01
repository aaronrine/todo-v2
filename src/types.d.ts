export interface CardProps {
  id: any
  text: string
  priority: number
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setCards: any
  setIsOpen: any
  setCurrentCardId: any
}

export interface DragItem {
  index: number
  id: string
  type: string
}

