export function TodoControlPanel({
  setCards,
  id,
  setIsOpen,
  setCurrentCardId,
  setMarked
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
      <input className="markBtn" type="checkbox" onChange={()=>{
        setMarked((prev:any) => !prev)
      }}/>
    </div>
  );
}
