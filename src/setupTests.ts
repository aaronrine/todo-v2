// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//there is a list of todos
test('todos list exists')
test('todos list is on the page')
//the todo list remembers it's data after browser closes
test('todos list stores semi permament data')
test('todos list reads semi permament data')
//todo's exist
test('todo item exists')
test('todo item is on the page')
//todo's have descriptions
test('todo item description exists')
test('todo item description is on the page')
//todo's have priorties
test('todo item priorty exists')
test('todo item priorty is on the page')
//there is a way to add a todo
test('todo item can be added to todo list')
test('todo item cannot be added to todo list if description is empty')
test('todo item cannot be added to todo list if priorty is not set')
test('new todo item that has been added to todo list is on page')
//there is a way to edit a todo
test('todo item can be edited')
test('edited todo item is on page')
test('edited todo item replaces old todo')
test('todo item cannot be marked complete while in edit mode')
test('todo item cannot be unmarked complete while in edit mode')
test('todo item cannot be deleted while in edit mode')
test('todo item cannot be added while in edit mode')
//there is a way to remove a todo
test('todo item can be deleted from todos list')
test('todo item is removed from todos list')
test('todo item is not on the page')
//there is a way to mark a todo as complete
test('todo item can be marked complete')
test('marked todo item is on the page')
test('todo item can be unmarked complete')
test('unmarked todo item is on the page')
//there is a way to reorder the todo list
test('todo item can be moved in front of another todo item in todos list')
test('todo item can be moved behind of another todo item in todos list')
test('todo item cannot be moved in front of the start of todos list')
test('todo item cannot be moved behind of the end of todos list')
test('moved todo item is in expected position in todos list')
test('moved todo item is in expected position on the page')