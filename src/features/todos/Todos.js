import { Container, List } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewTodoInput } from "./NewTodoInput";
import { selectTodos, fetchTodosAsync, addTodoAsync } from "./todoSlice";
import { TodoItem } from "./TodoItem";

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
    <Container maxWidth="md" disableGutters>
      <NewTodoInput onSubmit={addTodo} />
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            description={todo.description}
            completed={!!todo.completed_at}
            onToggleCompleted={() => {}}
            onDelete={() => {}}
            onDescriptionUpdate={() => {}}
          />
        ))}
      </List>
    </Container>
  );
};
