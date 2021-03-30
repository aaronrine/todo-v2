import { useState } from "react";
import Modal from "react-modal";

export function EditModal({
  modalIsOpen,
  setIsOpen,
  getCurrentCardById,
  setCards,
}: any) {
  const currentCard = getCurrentCardById();
  const [priority, setPriority] = useState(5);
  const [editText, setEditText] = useState("");
  function preventBadData() {
    if (!isNaN(priority) && editText !== "") {
      currentCard.text = editText;
      currentCard.priority = priority;
      setCards((prev: any) => {
        const idx = prev.indexOf(getCurrentCardById());
        prev[idx] = currentCard;
        return prev;
      });
      setIsOpen(false);
    }
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById("root") as HTMLDivElement}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          preventBadData();
        }}
      >
        <label htmlFor="editDescriptionInput" id="editDescriptionLabel">
          Edit Todo Description
        </label>
        <input
          aria-labelledby="editDescriptionLabel"
          type="text"
          id="editDescriptionInput"
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          required
        />
        <label htmlFor="editPriorityInput">Edit Priority Level</label>
        <input
          type="number"
          id="editPriorityInput"
          value={priority || ""}
          min="1"
          max="5"
          onChange={(e) => {
            setPriority(Math.min(Math.max(parseInt(e.target.value), 1), 5));
          }}
          required
        />
        <button type="submit">Close</button>
      </form>
    </Modal>
  );
}
