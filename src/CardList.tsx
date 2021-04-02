import { useTodoListContext } from "./TodoListContext";
import { Preview } from "react-dnd-multi-backend";
import "./CardList.scss";
export function CardList() {
  const { cards, renderCard, getCardById } = useTodoListContext();
  function generatePreview({ itemType, item, style }: any) {
    return (
      <div style={{ ...style, background: "white" }}>
        {renderCard(getCardById(item.id))}
      </div>
    );
  }
  return (
    <div className="CardList">
      {cards.map((card: any, i: any) => renderCard(card, i))}
      <Preview generator={generatePreview} />
    </div>
  );
}
