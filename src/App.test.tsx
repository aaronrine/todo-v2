import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('TodoList', () => {
  test.todo('is on the page')
  test.todo('is empty on startup')
  test.todo('stores and reads from local storage')
  test.todo('has a todo description text input')
  test.todo('has a todo priorty input')
  test.todo('has an add button on the page')
  test.todo('adds a valid todo to the list when add button is pressed')
  test.todo('can reorder a TodoItem in front or behind of other TodoItems')
})

describe('TodoItem', () => {
  test.todo('is on the page')
  test.todo('has description text on the page')
  test.todo('has a priorty level on the page')
  describe('edit button', () => {
    test.todo('has an edit button on the page')
    test.todo('opens an edit form modal when edit button is pressed')
    test.todo('has a todo description text input')
    test.todo('has a todo priorty input')
    test.todo('populates the edit form modal with the current todo data')
  })
  describe('delete button', () => {
    test.todo('has a delete button on the page')
    test.todo('is not in the TodoList')
    test.todo('is not on the page after delete button is pressed')
  })
  describe('mark button', () => {
    test.todo('has a mark button when unmarked on the page')
    test.todo('has a marked status on the page when marked button is pressed')
    test.todo('has an unmark button when marked on the page')
    test.todo('has an unmarked status on the page when unmark button is pressed')
  })
})