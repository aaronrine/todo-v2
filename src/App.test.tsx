import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "react-modal";
import App from "./App";

describe("ToDoAddForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Prevents adding empty string to the card text", () => {
    render(<App />);
    const addBtn = screen.getByRole("button");
    userEvent.click(addBtn);
    expect(screen.queryByLabelText("Todo")).not.toBeInTheDocument();
  });
  it("Adds valid text to a card", () => {
    render(<App />);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    expect(screen.getByText(/milk/)).toBeInTheDocument();
  });
  it("Prevents adding NaN priority to the card", () => {
    render(<App />);
    const priorityInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(priorityInput, "{backspace}");
    userEvent.click(addBtn);
    expect(screen.queryByLabelText("Todo")).not.toBeInTheDocument();
  });
  it("Prevents adding priorities less than 1 to the card", () => {
    render(<App />);
    const textInput = screen.getByRole("textbox");
    const priorityInput = screen.getByDisplayValue("5");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "hotdog");
    userEvent.type(priorityInput, "{backspace}0");
    userEvent.click(addBtn);
    expect(screen.queryByLabelText("Todo")).toHaveTextContent("1");
  });
  it("Prevents adding priorities more than 5 to the card", () => {
    render(<App />);
    const textInput = screen.getByRole("textbox");
    const priorityInput = screen.getByDisplayValue("5");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "hotdog");
    userEvent.type(priorityInput, "{backspace}6");
    userEvent.click(addBtn);
    expect(screen.queryByLabelText("Todo")).toHaveTextContent("5");
  });
  it("Adds default priority to the card", () => {
    render(<App />);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });
  //the drag and drop functionality is not tested as im not skilled enough in testing yet to do it
  //before the deadline. will come back later
});
describe("TodoControlPanel", () => {
  it("Deletes a todo when delete button is clicked", () => {
    render(<App />);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const delBtn = screen.getByText("Delete");
    userEvent.click(delBtn);
    expect(screen.queryByLabelText("Todo")).not.toBeInTheDocument();
  });
  it("Brings up the edit modal when the edit modal is clicked", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
  it('Gives a todo the marked class when mark button is clicked', () => {
    render(<App/>)
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const markBtn = screen.getByRole('checkbox')
    userEvent.click(markBtn)
    const todo = screen.getByLabelText('Todo')
    expect(todo).toHaveClass('marked')
  })
  it('Removes the marked class from a todo when mark button is clicked', () => {
    render(<App/>)
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const markBtn = screen.getByRole('checkbox')
    userEvent.click(markBtn)
    const todo = screen.getByText(/milk/)
    userEvent.click(markBtn)
    expect(todo).not.toHaveClass('marked')
  })
});
describe("ModalForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Sets the default input values to the cards current text and priority", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    expect(modalTextInput).toHaveValue("milk");
  });
  it("Replaces the current text and priority when the close button is clicked", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
    const closeBtn = screen.getByText("Close");
    userEvent.type(modalTextInput, "hotdog");
    userEvent.type(modalPriorityInput, "{backspace}4");
    userEvent.click(closeBtn);
    expect(screen.getByLabelText("Todo")).toHaveTextContent("hotdog 4");
  });
  it("Does not submit when the text field is empty", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
    const closeBtn = screen.getByText("Close");
    userEvent.type(
      modalTextInput,
      "{backspace}{backspace}{backspace}{backspace}"
    );
    userEvent.type(modalPriorityInput, "{backspace}4");
    userEvent.click(closeBtn);
    expect(modalPriorityInput).toBeInTheDocument();
  });
  it("Does not submit when the priority field is empty", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
    const closeBtn = screen.getByText("Close");
    userEvent.type(modalTextInput, "hotdog");
    userEvent.type(modalPriorityInput, "{backspace}");
    userEvent.click(closeBtn);
    expect(modalPriorityInput).toBeInTheDocument();
  });
  it("Priority has a min value of 1", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
    const closeBtn = screen.getByText("Close");
    userEvent.type(modalTextInput, "hotdog");
    userEvent.type(modalPriorityInput, "{backspace}0");
    userEvent.click(closeBtn);
    expect(screen.getByLabelText("Todo")).toHaveTextContent("hotdog 1");
  });
  it("Priority has a max value of 5", () => {
    render(<App />);
    Modal.setAppElement(document.querySelector("div") as HTMLDivElement);
    const textInput = screen.getByRole("textbox");
    const addBtn = screen.getByRole("button");
    userEvent.type(textInput, "milk");
    userEvent.click(addBtn);
    const edtBtn = screen.getByText("Edit");
    userEvent.click(edtBtn);
    const modalTextInput = screen.getByLabelText("Edit Todo Description");
    const modalPriorityInput = screen.getByLabelText("Edit Priority Level");
    const closeBtn = screen.getByText("Close");
    userEvent.type(modalTextInput, "hotdog");
    userEvent.type(modalPriorityInput, "{backspace}6");
    userEvent.click(closeBtn);
    expect(screen.getByLabelText("Todo")).toHaveTextContent("hotdog 5");
  });
});
