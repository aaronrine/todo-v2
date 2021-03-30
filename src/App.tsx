import { useState, useEffect, useCallback, useRef } from "react";
import {DndProvider, useDrag, useDrop, DropTargetMonitor} from 'react-dnd'
import {XYCoord} from 'dnd-core'
import update from 'immutability-helper'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {v4 as uuidv4} from 'uuid'
import Modal from 'react-modal'
import "./App.scss";



interface CardProps {
  id: any
  text: string
  priority: number
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setCards: any
  setIsOpen: any
  setCurrentCard: any
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ItemTypes = {
  CARD: 'card'
}

export function useLocalStorage(key: string, defaultValue: any) {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}



export function Card({id, text, priority, index, moveCard, setCards, setIsOpen, setCurrentCard}:CardProps) {
  const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
  const ref = useRef<HTMLDivElement>(null)
  const [{handlerId}, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {handlerId: monitor.getHandlerId()}
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if(!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      //prevent replacing items with themselves
      if(dragIndex === hoverIndex) {
        return
      }
      //find rect on screen
      const hoverBoundingRect  =ref.current?.getBoundingClientRect()
      //Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      //Determine mouse position
      const clientOffset = monitor.getClientOffset()
      //Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      //Dragging downwards
      if(dragIndex<hoverIndex&&hoverClientY<hoverMiddleY) {
        return
      }
      //Dragging upwards
      if(dragIndex>hoverIndex&&hoverClientY>hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      //this is a necassary mutation to prevent index searches
      item.index = hoverIndex
    }
  })
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return {id, index}
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{...style, opacity}} data-handler-id={handlerId} aria-label="Todo">
      {text} {priority}
      <TodoControlPanel setCards={setCards} id={id} setIsOpen={setIsOpen} setCurrentCard={setCurrentCard}/>
    </div>
  )
}
function TodoControlPanel({setCards, id, setIsOpen, setCurrentCard}:any) {
  
  return(
    <div>
      <button onClick={() => {setCards((prev:any) => prev.filter((todo:any) => todo.id !== id))}}>-</button>
      <button onClick={() => {
        setIsOpen(true)
        setCurrentCard(id)
        }}>Edit</button>
    </div>
  )
}
function TodoAddForm({setCards}:any) {
    const [priority, setPriority] = useState(5);
    const [text, setText] = useState("");
    function preventBadData() {
      if (!isNaN(priority) && text !== "") {
        setCards((prev:CardProps[]) => [...prev, { priority, text, id:uuidv4() }]);
      }
    }
    return (
      <form
          onSubmit={(e) => {
            e.preventDefault();
            preventBadData();
          }}
        >
          <label
            htmlFor="addDescriptionInput"
          >
            Todo Description
          </label>
          <input
            type="text"
            id="addDescriptionInput"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            required
          />
          <label htmlFor="addPriorityInput">
            Priority Level
          </label>
          <input
            type="number"
            id="addPriorityInput"
            value={priority || ""}
            min="1"
            max="5"
            onChange={(e) => {
              setPriority(Math.min(Math.max(parseInt(e.target.value), 1), 5));
            }}
            required
          />
          <button type="submit">
            +
          </button>
        </form>
    )
  }

function Container() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentCardId, setCurrentCard] = useState('')
  const [cards, setCards] = useLocalStorage('cards',[])
  const style = {
    width: 400,
  }
  function getCurrentCardById() {
    return cards.find((card:any) => card.id === currentCardId)
  }
  {
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex,1],
              [hoverIndex,0,dragCard]
            ]
          })
        )
      },
      [cards, setCards]
    )
    const renderCard= (card:{id:number,text:string, priority:number}, index:number) => {
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
      )
    }
    return (
      <>
        <TodoAddForm cards={cards} setCards={setCards} />
        <EditModal 
          modalIsOpen={modalIsOpen} 
          setIsOpen={setIsOpen}
          getCurrentCardById={getCurrentCardById}
          setCards={setCards}
        />
        <div style={style}>{cards.map((card:any, i:any) => renderCard(card, i))}</div>
      </>
    )
  }
}


function EditModal({modalIsOpen, setIsOpen, getCurrentCardById, setCards}:any) {
  const currentCard = getCurrentCardById()
  const [priority, setPriority] = useState(5);
  const [editText, setEditText] = useState('');
  function preventBadData() {
    if (!isNaN(priority) && editText !== "") {
      currentCard.text = editText
      currentCard.priority = priority
      setCards((prev:any) => {
        const idx = prev.indexOf(getCurrentCardById())
        prev[idx] = currentCard
        return prev
      })
      setIsOpen(false)
    }
  }
  return(
    <Modal isOpen={modalIsOpen} appElement={document.getElementById('root') as HTMLDivElement}>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        preventBadData();
      }}>
        <label
            htmlFor="editDescriptionInput"
            id='editDescriptionLabel'
          >
            Edit Todo Description
          </label>
          <input
          aria-labelledby='editDescriptionLabel'
            type="text"
            id="editDescriptionInput"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            required
          />
          <label htmlFor="editPriorityInput">
            Edit Priority Level
          </label>
          <input
            type="number"
            id="editPriorityInput"
            value={priority || ""}
            min="1"
            max="5"
            onChange={(e) => {
              setPriority(Math.min(Math.max(parseInt(e.target.value), 1), 5));
            }}
            required
          />
      <button type='submit'>Close</button>
      </form>
    </Modal>
  )
}


function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <Container />
      </DndProvider>
    </div>
  );
}

export default App;
