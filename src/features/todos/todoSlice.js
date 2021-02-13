import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    updateTempTodo: (state, action) => {
      const { tempId, todo } = action.payload;
      const todoIndex = state.todos.findIndex((value) => value.id === tempId);

      state.todos[todoIndex] = todo;
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
    updateTodoDescription: (state, action) => {
      const { id, description } = action.payload;
      const todoIndex = state.todos.findIndex((value) => value.id === id);

      state.todos[todoIndex].description = description;
    },
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
  updateTempTodo,
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
  const tempId = nanoid();
  const tempTodo = {
    id: tempId,
    description,
  };

  dispatch(addTodo(tempTodo));
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

  dispatch(updateTempTodo({ tempId, todo }));
  dispatch(updateLoading(false));
};

export const completeTodoAsync = (id) => async (dispatch) => {
  dispatch(completeTodo(id));
  dispatch(sortTodos());
  dispatch(updateLoading(true));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}/completed`, {
    method: "PUT",
  });

  dispatch(updateLoading(false));
};

export const uncompleteTodoAsync = (id) => async (dispatch) => {
  dispatch(uncompleteTodo(id));
  dispatch(sortTodos());
  dispatch(updateLoading(true));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}/uncompleted`, {
    method: "PUT",
  });

  dispatch(updateLoading(false));
};

export const updateTodoDescriptionAsync = (id, description) => async (
  dispatch
) => {
  dispatch(updateTodoDescription({ id, description }));
  dispatch(updateLoading(true));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      task: { description },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  dispatch(updateLoading(false));
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  dispatch(deleteTodo(id));
  dispatch(updateLoading(true));

  await fetch(`${baseUrl}api/v1/users/${userId}/tasks/${id}`, {
    method: "DELETE",
  });

  dispatch(updateLoading(false));
};

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;

export default todosSlice.reducer;
