import React, { useState, useCallback, useContext, useEffect, useRef } from "react";
import { useLocalStorage } from "./hooks";
import update from "immutability-helper";
import type {Todo} from './types'
import { Card } from "./Card";

interface ContextState {
  cards: any;
  setCards: any;
  getCurrentCard: any;
  setCurrentCardId: any;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  renderCard: any;
  setIsOpen: any;
  modalIsOpen: any;
  getCardById: any;
  toggleMarkedById: any;
  sanitizeData: any;
  deleteCard: any;
  sortCards: any;
}

const TodoListContext = React.createContext({} as ContextState);

export function TodoListContextProvider({ children }: any) {
  const [cards, setCards] = useLocalStorage("cards", []);
  const currentCardId = useRef("");
  // const [currentCardId, setCurrentCardId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function doFetch(){
      const res = await fetch("http://localhost:8000/todos/", {
        method: 'get'
      })
      if(res.status !== 200){
        console.error(res)
        return;
      }
      const cards = await res.json();
      setCards(cards);
    }
    doFetch()
  }, [])

  useEffect(() => {
    if (modalIsOpen === false) {
      setCurrentCardId("");
    }
  }, [modalIsOpen]);

  function setCurrentCardId(id:string) {
    currentCardId.current = id;
  }


  async function deleteCard(id:string) {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "delete",
    });
    setCards((prev: any) => prev.filter((todo: any) => todo.id !== id));
  }

  function toggleMarkedById(id: string, marked: boolean) {
    setCards((prev: any) =>
      prev.map((item: any) => {
        if (item.id !== id) return item;
        return { ...item, marked };
      })
    );
  }

  async function sortCards() {
    await fetch("http://localhost:8000/todos/sort/", {
      method: "post",
      body: JSON.stringify({
        todo_ids: cards.map((card:Todo) => card.id)
      })
    });
  }

  function sanitizeData(text:string, priority:number) {
    const currentCard = getCurrentCard() 
    async function handleEdit() {
      await fetch(`http://localhost:8000/todos/`, {
        method: "put",
        body: JSON.stringify({
          ...currentCard,
          text,
          priority
        })
      })
      setCards((prev: any) =>
        prev.map((item: any) => {
          if (item.id !== currentCard.id) {
            return item;
          }
          return {
            ...currentCard,
            text,
            priority,
          };
        })
      );
      setIsOpen(false);
    }
    async function handleAdd() {
      const res = await fetch("http://localhost:8000/todos/create/", {
        method: "post",
        body: JSON.stringify({
          priority,
          text,
          marked: false,
          sortOrder: 0
        }),
      });
      if(res.status !== 200){
        console.error(res)
        return;
      }
      const json = await res.json()
      console.log(json)
      setCards((prev: Todo[]) => [
        { priority, text, marked: false, sortOrder:0},
        ...prev
      ]);
    }
    if (isNaN(priority) || text === "") return;
    if (currentCard) return handleEdit();
    return handleAdd();
  }
  function getCardById(id: string) {
    return cards.find((card: any) => card.id === id);
  }
  function getCurrentCard() {
    return getCardById(currentCardId.current);
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
    card: Todo,
    index: number
  ) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        marked={card.marked}
        text={card.text}
        priority={card.priority}
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
        toggleMarkedById,
        sanitizeData,
        deleteCard,
        sortCards,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}

export function useTodoListContext() {
  return useContext(TodoListContext);
}
