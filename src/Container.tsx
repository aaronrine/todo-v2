import {useState, useCallback} from 'react'
import {useLocalStorage} from './hooks'
import update from "immutability-helper";
import {Card} from './Card'
import {TodoAddForm} from './TodoAddForm'
import {EditModal} from './EditModal'

export function Container() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentCardId, setCurrentCard] = useState("");
  const [cards, setCards] = useLocalStorage("cards", []);
  const style = {
    width: 400,
  };
  function getCurrentCardById() {
    return cards.find((card: any) => card.id === currentCardId);
  }
  {
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        );
      },
      [cards, setCards]
    );
    const renderCard = (
      card: { id: number; text: string; priority: number },
      index: number
    ) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          priority={card.priority}
          moveCard={moveCard}
          setCards={setCards}
          setIsOpen={setIsOpen}
          setCurrentCard={setCurrentCard}
        />
      );
    };
    return (
      <>
        <TodoAddForm cards={cards} setCards={setCards} />
        <EditModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          getCurrentCardById={getCurrentCardById}
          setCards={setCards}
        />
        <div style={style}>
          {cards.map((card: any, i: any) => renderCard(card, i))}
        </div>
      </>
    );
  }
}
