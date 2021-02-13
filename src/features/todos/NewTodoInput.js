import { TextField, InputAdornment, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    color: theme.palette.primary.main,
  },
}));

export const NewTodoInput = ({ onSubmit }) => {
  const classes = useStyles();
  const [description, setDescription] = useState("");

  const updateDescription = (event) => {
    setDescription(event.target.value);
  };

  const submit = (event) => {
    if (event.key === "Enter" && description.length > 0) {
      onSubmit(description);
      setDescription("");
    }
  };

  return (
    <TextField
      value={description}
      onKeyPress={submit}
      onChange={updateDescription}
      placeholder="Add to list..."
      className={classes.textField}
      color="primary"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AddIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
