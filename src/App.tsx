import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.scss";
import { TodoAddForm } from "./TodoAddForm";
import { EditModal } from "./EditModal";
import { CardList } from "./CardList";
import { TodoListContextProvider } from "./TodoListContext";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
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
