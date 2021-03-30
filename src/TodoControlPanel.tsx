export function TodoControlPanel({
  setCards,
  id,
  setIsOpen,
  setCurrentCardId,
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
          setCurrentCardId(id);
        }}
      >
        Edit
      </button>
    </div>
  );
}
