import { useState } from "react";

export const NewTodoInput = ({ onSubmit }) => {
  const [description, setDescription] = useState("");

  const updateDescription = (event) => {
    setDescription(event.target.value);
  };

  const submit = (event) => {
    if (event.key === "Enter" && description.length > 0) onSubmit(description);
  };

  return (
    <input
      value={description}
      onKeyPress={submit}
      onChange={updateDescription}
      placeholder="Add to list..."
    />
  );
};
