import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { TodoControlPanel } from "./TodoControlPanel";
import type { Todo, DragItem } from "./types";
import {useTodoListContext} from './TodoListContext'
import './Card.scss'


export function Card({
  id,
  text,
  marked,
  priority,
  index,
}: Todo) {
  const { moveCard, sortCards} = useTodoListContext();
  const CARD = "card";
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId, todoDidDrop }, drop] = useDrop({
    accept: CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        todoDidDrop: monitor.didDrop()
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      //prevent replacing items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      //Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      //Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      //this is a necassary mutation to prevent index searches
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag] = useDrag({
    type: CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem()
    }),
  });
  const opacity = isDragging ? 0 : 1;
  
  if (todoDidDrop) {
    sortCards()
  }
  drag(drop(ref));
  return (
    <>
      <div
        ref={ref}
        data-handler-id={handlerId}
        aria-label="Todo"
        className={`Todo ${marked ? "marked" : ""}`}
        style={{ opacity: opacity }}
      >
        <div className="todoContent">
          <span className="todoText">{text}</span>
          <span className={`todoPriority priority${priority}`}>
            {" "}
            {priority}
          </span>
        </div>
        <TodoControlPanel
          id={id}
          marked={marked}
        />
      </div>
      
    </>
  );
}
