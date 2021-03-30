import Modal from "react-modal";
import { useTodoListContext } from "./TodoListContext";
import { TodoForm } from "./TodoForm";

export function EditModal() {
  const { modalIsOpen } = useTodoListContext();

  return (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById("root") as HTMLDivElement}
    >
      <TodoForm />
    </Modal>
  );
}
