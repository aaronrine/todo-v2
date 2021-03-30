import {TodoForm} from './TodoForm'
import {useTodoListContext} from './TodoListContext' 

export function TodoAddForm() {
  const {modalIsOpen} = useTodoListContext()
  if(modalIsOpen) return null
  return(
    <TodoForm />
  )
}
