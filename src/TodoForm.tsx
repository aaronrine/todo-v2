import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodoListContext } from "./TodoListContext";
import type { CardProps } from "./types";
import './TodoForm.scss'

export function TodoForm() {
  const { setCards, getCurrentCard, setIsOpen } = useTodoListContext();
  const currentCard = getCurrentCard();
  const [priority, setPriority] = useState(
    currentCard ? currentCard.priority : 5
  );
  const [text, setText] = useState(currentCard ? currentCard.text : "");
  function preventBadData() {
    function handleEdit() {
      setCards((prev: any) =>
        prev.map((item: any) => {
          if (item.id !== currentCard.id) {
            return item;
          }
          return {
            ...currentCard,
            text,
            priority,
          };
        })
      );
      setIsOpen(false);
    }
    function handleAdd() {
      setCards((prev: CardProps[]) => [
        ...prev,
        { priority, text, marked:false, id: uuidv4() },
      ]);
    }
    if (isNaN(priority) || text === "") return;
    if (currentCard) return handleEdit();
    return handleAdd();
  }
  const mode = currentCard ? 'edit' : 'add'
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        preventBadData();
      }}
    >
      <label
        htmlFor={`${mode}DescriptionInput`}
        id={`${mode}DescriptionInputLabel`}
      >
        {mode === "edit" ? "Edit " : ""}Todo Description
        <input
          aria-labelledby={`${mode}DescriptionInputLabel`}
          type="text"
          className={`${mode}DescriptionInput`}
          id={`${mode}DescriptionInput`}
          name={`${mode}Description`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
        />
      </label>
      <label htmlFor={`${mode}PriorityInput`}>
        {mode === "edit" ? "Edit " : ""}Priority Level
        <input
          type="number"
          className={`${mode}PriorityInput`}
          id={`${mode}PriorityInput`}
          value={priority || ""}
          min="1"
          max="5"
          onChange={(e) => {
            setPriority(Math.min(Math.max(parseInt(e.target.value), 1), 5));
          }}
          required
        />
      </label>
      <button type="submit">{mode === "add" ? "Add" : "Close"}</button>
    </form>
  );
}
