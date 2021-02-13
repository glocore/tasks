import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    updateTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    toggleTodo: (state, action) => {},
    updateTodoById: (state, action) => {},
    updateTodoDescription: (state, action) => {},
    deleteTodo: (state, action) => {},
  },
});

export const {
  updateTodos,
  addTodo,
  toggleTodo,
  updateTodoDescription,
  deleteTodo,
} = todosSlice.actions;

const baseUrl = "https://tiny-list.herokuapp.com/";
const userId = 132;

export const fetchTodosAsync = () => async (dispatch) => {
  const response = await fetch(`${baseUrl}api/v1/users/${userId}/tasks`);
  const todos = await response.json();

  dispatch(updateTodos(todos));
};

export const addTodoAsync = (description) => async (dispatch) => {
  const response = await fetch(`${baseUrl}api/v1/users/${userId}/tasks`, {
    method: "POST",
    body: JSON.stringify({
      task: { description },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const todo = await response.json();

  dispatch(addTodo(todo));
};

export const completeTodoAsync = (id) => async (dispatch) => {
  const response = await fetch(
    `${baseUrl}api/v1/users/${userId}/tasks/${id}/completed`,
    {
      method: "PUT",
    }
  );

  const todo = await response.json();

  dispatch(toggleTodo(todo));
};

export const uncompleteTodoAsync = (id) => async (dispatch) => {
  const response = await fetch(
    `${baseUrl}api/v1/users/${userId}/tasks/${id}/uncompleted`,
    {
      method: "PUT",
    }
  );

  const todo = await response.json();

  dispatch(toggleTodo(todo));
};

export const updateTodoDescriptionAsync = (id, description) => async (
  dispatch
) => {
  const response = await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      task: { description },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const todo = await response.json();

  dispatch(updateTodoDescription(todo));
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}`, {
    method: "DELETE",
  });

  dispatch(deleteTodo(id));
};

export const selectTodos = (state) => state.todos.todos;

export default todosSlice.reducer;
