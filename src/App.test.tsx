import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('todo list', () => {
  it.todo('is on the page')
  it.todo('is empty on startup')
  it.todo('stores and reads from local storage')
  it.todo('has a todo description text input')
  it.todo('has a todo priorty input')
  it.todo('has an add button on the page')
  it.todo('adds a valid todo to the list when add button is pressed')
  it.todo('can reorder a todo item in front or behind of other todo items')
})

describe('todo item', () => {
  it.todo('is on the page')
  it.todo('has description text on the page')
  it.todo('has a priorty level on the page')
  describe('edit button', () => {
    it.todo('has an edit button on the page')
    it.todo('opens an edit form modal when edit button is pressed')
    it.todo('has a todo description text input')
    it.todo('has a todo priorty input')
    it.todo('populates the edit form modal with the current todo data')
  })
  describe('delete button', () => {
    it.todo('has a delete button on the page')
    it.todo('is not in the todo list')
    it.todo('is not on the page after delete button is pressed')
  })
  describe('mark button', () => {
    it.todo('has a mark button when unmarked on the page')
    it.todo('has a marked status on the page when marked button is pressed')
    it.todo('has an unmark button when marked on the page')
    it.todo('has an unmarked status on the page when unmark button is pressed')
  })
})