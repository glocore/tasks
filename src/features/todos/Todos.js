import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewTodoInput } from "./NewTodoInput";
import { selectTodos, fetchTodosAsync, addTodoAsync } from "./todoSlice";

export const Todos = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const addTodo = (description) => {
    dispatch(addTodoAsync(description));
  };

  return (
    <div>
      <NewTodoInput onSubmit={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
};
