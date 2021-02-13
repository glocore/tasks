import { createSlice } from "@reduxjs/toolkit";

const userId = 132;

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    updateTodos: (state, action) => {},
    addTodo: (state, action) => {},
    toggleTodo: (state, action) => {},
    renameTodo: (state, action) => {},
    deleteTodo: (state, action) => {},
  },
});

export const {
  updateTodos,
  addTodo,
  toggleTodo,
  renameTodo,
  deleteTodo,
} = todosSlice.actions;

export const fetchTodosAsync = (state, action) => {};
export const addTodoAsync = (state, action) => {};
export const toggleTodoAsync = (state, action) => {};
export const renameTodoAsync = (state, action) => {};
export const deleteTodoAsync = (state, action) => {};

export default todosSlice.reducer;
