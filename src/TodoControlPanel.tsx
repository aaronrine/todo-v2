export function TodoControlPanel({
  setCards,
  id,
  setIsOpen,
  setCurrentCard,
}: any) {
  return (
    <div>
      <button
        onClick={() => {
          setCards((prev: any) => prev.filter((todo: any) => todo.id !== id));
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setIsOpen(true);
          setCurrentCard(id);
        }}
      >
        Edit
      </button>
    </div>
  );
}
