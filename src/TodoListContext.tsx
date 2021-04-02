import React, { useState, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "./hooks";
import update from "immutability-helper";
import { Card } from "./Card";

interface ContextState {
  cards: any;
  setCards: any;
  getCurrentCard: any;
  setCurrentCardId: any;
  moveCard: any;
  renderCard: any;
  setIsOpen: any;
  modalIsOpen: any;
  getCardById: any;
}

const TodoListContext = React.createContext({} as ContextState);

export function TodoListContextProvider({ children }: any) {
  const [cards, setCards] = useLocalStorage("cards", []);
  const [currentCardId, setCurrentCardId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(modalIsOpen===false){
      setCurrentCardId('')
    }
  }, [modalIsOpen])

  function getCardById(id:string){
    return cards.find((card: any) => card.id === id);
  }
  function getCurrentCard() {
    return getCardById(currentCardId)
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
        setCurrentCardId={setCurrentCardId}
      />
      
    );
  };
  return (
    <TodoListContext.Provider
      value={{
        cards,
        setCards,
        getCurrentCard,
        getCardById,
        setCurrentCardId,
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
