import {useTodoListContext} from './TodoListContext'
export function CardList() {
  const { cards, renderCard } = useTodoListContext();
  return (
    <div style={{ width: 400 }}>
      {cards.map((card: any, i: any) => renderCard(card, i))}
    </div>
  );
}
