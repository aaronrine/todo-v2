import {useTodoListContext} from './TodoListContext'
import './CardList.scss'
export function CardList() {
  const { cards, renderCard } = useTodoListContext();
  return (
    <div className='CardList'>
      {cards.map((card: any, i: any) => renderCard(card, i))}
    </div>
  );
}
