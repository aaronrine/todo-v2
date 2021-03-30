import React, { useState, useCallback, useContext } from "react";
import { useLocalStorage } from "./hooks";
import update from "immutability-helper";
import { Card } from "./Card";

interface ContextState {
  cards: any;
  setCards: any;
  getCurrentCardById: any;
  setCurrentCard: any;
  moveCard: any;
  renderCard: any;
  setIsOpen: any;
  modalIsOpen: any;
}

const TodoListContext = React.createContext({} as ContextState);

export function TodoListContextProvider({ children }: any) {
  const [cards, setCards] = useLocalStorage("cards", []);
  const [currentCardId, setCurrentCard] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  function getCurrentCardById() {
    return cards.find((card: any) => card.id === currentCardId);
  }
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
    <TodoListContext.Provider
      value={{
        cards,
        setCards,
        getCurrentCardById,
        setCurrentCard,
        moveCard,
        renderCard,
        setIsOpen,
        modalIsOpen,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}

export function useTodoListContext() {
  return useContext(TodoListContext);
}
