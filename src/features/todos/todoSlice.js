import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
  },
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateTodos: (state, action) => {
      state.todos = action.payload;
    },
    sortTodos: (state) => {
      const completedTodos = [];
      const uncompletedTodos = [];

      state.todos
        .sort(
          (first, second) =>
            Date.parse(second.created_at) - Date.parse(first.created_at)
        )
        .forEach((todo) => {
          if (todo.completed_at) {
            completedTodos.push(todo);
          } else {
            uncompletedTodos.push(todo);
          }
        });
      state.todos = uncompletedTodos.concat(completedTodos);
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    completeTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (value) => value.id === action.payload
      );

      state.todos[todoIndex].completed_at = true;
    },
    uncompleteTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (value) => value.id === action.payload
      );

      state.todos[todoIndex].completed_at = null;
    },
    updateTodoDescription: (state, action) => {},
    deleteTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(todoIndex, 1);
    },
  },
});

export const {
  updateLoading,
  updateTodos,
  sortTodos,
  addTodo,
  completeTodo,
  uncompleteTodo,
  updateTodoDescription,
  deleteTodo,
} = todosSlice.actions;

const baseUrl = "https://tiny-list.herokuapp.com/";
const userId = 132;

export const fetchTodosAsync = () => async (dispatch) => {
  dispatch(updateLoading(true));
  const response = await fetch(`${baseUrl}api/v1/users/${userId}/tasks`);
  const todos = await response.json();

  dispatch(updateTodos(todos));
  dispatch(sortTodos());
  dispatch(updateLoading(false));
};

export const addTodoAsync = (description) => async (dispatch) => {
  dispatch(updateLoading(true));
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
  dispatch(updateLoading(false));
};

export const completeTodoAsync = (id) => async (dispatch) => {
  dispatch(updateLoading(true));
  dispatch(completeTodo(id));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}/completed`, {
    method: "PUT",
  });

  dispatch(sortTodos());
  dispatch(updateLoading(false));
};

export const uncompleteTodoAsync = (id) => async (dispatch) => {
  dispatch(updateLoading(true));
  dispatch(uncompleteTodo(id));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}/uncompleted`, {
    method: "PUT",
  });

  dispatch(sortTodos());
  dispatch(updateLoading(false));
};

export const updateTodoDescriptionAsync = (id, description) => async (
  dispatch
) => {
  dispatch(updateLoading(true));
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
  dispatch(updateLoading(false));
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  dispatch(updateLoading(true));
  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}`, {
    method: "DELETE",
  });

  dispatch(deleteTodo(id));
  dispatch(updateLoading(false));
};

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;

export default todosSlice.reducer;
