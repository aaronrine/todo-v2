import { DndProvider } from "react-dnd";
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import "./App.scss";
import { TodoAddForm } from "./TodoAddForm";
import { EditModal } from "./EditModal";
import { CardList } from "./CardList";
import { TodoListContextProvider } from "./TodoListContext";


function App() {
  return (
    <div className="App">
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <TodoListContextProvider>
          <TodoAddForm />
          <EditModal />
          <CardList />
        </TodoListContextProvider>
      </DndProvider>
    </div>
  );
}

export default App;
