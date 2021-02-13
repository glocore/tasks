import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todoSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
