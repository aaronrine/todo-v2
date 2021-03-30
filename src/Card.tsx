import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

import { TodoControlPanel } from "./TodoControlPanel";
import type { CardProps, DragItem } from "./types";

export function Card({
  id,
  text,
  priority,
  index,
  moveCard,
  setCards,
  setIsOpen,
  setCurrentCard,
}: CardProps) {
  const CARD = "card";
  const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
  };
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: CARD,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
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
      //find rect on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      //Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      //Determine mouse position
      const clientOffset = monitor.getClientOffset();
      //Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      //Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      //Dragging upwards
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
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
      aria-label="Todo"
    >
      {text} {priority}
      <TodoControlPanel
        setCards={setCards}
        id={id}
        setIsOpen={setIsOpen}
        setCurrentCard={setCurrentCard}
      />
    </div>
  );
}
