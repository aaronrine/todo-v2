import "./TodoControlPanel.scss";
import {useTodoListContext} from './TodoListContext'
export function TodoControlPanel({
  setCards,
  id,
  setIsOpen,
  setCurrentCardId,
  marked
}: any) {
  const {toggleMarkedById} = useTodoListContext()
  return (
    <div className="TodoControlPanel">
      <button
        className="deleteBtn"
        onClick={() => {
          setCards((prev: any) => prev.filter((todo: any) => todo.id !== id));
        }}
      >
        Delete
      </button>
      <button
        className="editBtn"
        onClick={() => {
          setIsOpen(true);
          setCurrentCardId(id);
        }}
      >
        Edit
      </button>
      <div
        className={`checkboxContainer ${marked? 'marked' : ''}`}
        onClick={() => {
          toggleMarkedById(id, !marked)
        }}
      >
        <input className="markBtn" type="checkbox" />
        <span className="checkmark"></span>
      </div>
    </div>
  );
}
