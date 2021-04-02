import { useState } from "react";
import { useTodoListContext } from "./TodoListContext";
import './TodoForm.scss'

export function TodoForm() {
  const { getCurrentCard, sanitizeData } = useTodoListContext();
  const currentCard = getCurrentCard();
  const [priority, setPriority] = useState(
    currentCard ? currentCard.priority : 5
  );
  const [text, setText] = useState(currentCard ? currentCard.text : "");

  const mode = currentCard ? 'edit' : 'add'
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sanitizeData(text, priority);
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
