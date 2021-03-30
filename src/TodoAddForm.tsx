import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { CardProps } from "./types";
import {useTodoListContext} from './TodoListContext'

export function TodoAddForm() {
  const {setCards} = useTodoListContext()
  const [priority, setPriority] = useState(5);
  const [text, setText] = useState("");
  function preventBadData() {
    if (!isNaN(priority) && text !== "") {
      setCards((prev: CardProps[]) => [
        ...prev,
        { priority, text, id: uuidv4() },
      ]);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        preventBadData();
      }}
    >
      <label htmlFor="addDescriptionInput">Todo Description</label>
      <input
        type="text"
        id="addDescriptionInput"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        required
      />
      <label htmlFor="addPriorityInput">Priority Level</label>
      <input
        type="number"
        id="addPriorityInput"
        value={priority || ""}
        min="1"
        max="5"
        onChange={(e) => {
          setPriority(Math.min(Math.max(parseInt(e.target.value), 1), 5));
        }}
        required
      />
      <button type="submit">+</button>
    </form>
  );
}
