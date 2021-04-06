import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "react-modal";
import App from "./App";

function addTodo(text: string, priority?: string): HTMLElement | null {
  const textInput = screen.getByRole("textbox");
  const priorityInput = screen.getByDisplayValue("5");
  const addBtn = screen.getByRole("button");
  if (text) userEvent.type(textInput, text);
  if (priority) userEvent.type(priorityInput, priority);
  userEvent.click(addBtn);
  const todo = screen.queryByLabelText("Todo");
  return todo;
}

function editTodo(
  text?: string,
  priority?: string
): { modalTextInput: HTMLElement; modalPriorityInput: HTMLElement } {
  const edtBtn = screen.getByText("Edit");
  userEvent.click(edtBtn);
  const modalTextInput = screen.getByLabelText("Edit Todo Description");
  const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
  const closeBtn = screen.getByText("Close");
  if (text) userEvent.type(modalTextInput, text);
  if (priority) userEvent.type(modalPriorityInput, priority);
  if (text || priority) userEvent.click(closeBtn);
  return { modalTextInput, modalPriorityInput };
}

describe("ToDoAddForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Prevents adding empty string to the card text", () => {
    render(<App />);
    const todo = addTodo( '', '5');
    expect(todo).not.toBeInTheDocument();
  });
  it("Adds valid text to a card", () => {
    render(<App />);
    const todo = addTodo("milk", "{backspace}3");
    expect(todo).toBeInTheDocument();
  });
  it("Prevents adding NaN priority to the card", () => {
    render(<App />);
    const todo = addTodo("milk", "{backspace}");
    expect(todo).not.toBeInTheDocument();
  });
  it("Prevents adding priorities less than 1 to the card", () => {
    render(<App />);
    const todo = addTodo("hotdog", '{backspace}0')
    expect(todo).toHaveTextContent("1");
  });
  it("Prevents adding priorities more than 5 to the card", () => {
    render(<App />);
    const todo = addTodo('hotdog', '{backspace}6')
    expect(todo).toHaveTextContent("5");
  });
  it("Adds default priority to the card", () => {
    render(<App />);
    const todo = addTodo('hotdog')
    expect(todo).toHaveTextContent('5');
  });
});
//TODO: the drag and drop functionality is not tested as im not skilled enough in testing yet to do it
//before the deadline. will come back later
describe("Todo", () => {
  it("Is draggable", () => {
    render(<App />);
  });
});
describe("TodoControlPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Deletes a todo when delete button is clicked", () => {
    render(<App />);
    const todo = addTodo('milk')
    const delBtn = screen.getByText("Delete");
    userEvent.click(delBtn);
    expect(todo).not.toBeInTheDocument();
  });
  it("Brings up the edit modal when the edit modal is clicked", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    addTodo('milk')
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
  it("Toggles the marked class from a todo when mark button is clicked", () => {
    render(<App />);
    const todo = addTodo('milk')
    const markBtn = screen.getByRole("checkbox");
    function setMarkedClass(marked: string){
      userEvent.click(markBtn);
    }
    setMarkedClass('mark')
    expect(todo).toHaveClass("marked");
    setMarkedClass('unmark')
    expect(todo).not.toHaveClass("marked");
  });
});
describe("ModalForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Sets the default input values to the cards current text and priority", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    addTodo('milk')
    const {modalTextInput} = editTodo()
    expect(modalTextInput).toHaveValue("milk");
  });
  it("Replaces the current text and priority when the close button is clicked", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const todo = addTodo('milk')
    editTodo("hotdog", '{backspace}4')
    expect(todo).toHaveTextContent("hotdog 4");
  });
  it("Does not submit when the text field is empty", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    addTodo('milk')
    const {modalTextInput} = editTodo("{backspace}{backspace}{backspace}{backspace}", '{backspace}4');
    expect(modalTextInput).toBeInTheDocument();
  });
  it("Does not submit when the priority field is empty", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    addTodo('milk')
    const {modalPriorityInput} = editTodo('hotdog', '{backspace}')
    expect(modalPriorityInput).toBeInTheDocument();
  });
  it("Priority has a min value of 1", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const todo = addTodo('milk')
    editTodo("hotdog", "{backspace}0");
    expect(todo).toHaveTextContent("hotdog 1");
  });
  it("Priority has a max value of 5", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const todo = addTodo('milk')
    editTodo("hotdog", "{backspace}6");
    expect(todo).toHaveTextContent("hotdog 5");
  });
});
