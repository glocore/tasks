import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeTodoAsync,
  deleteTodoAsync,
  uncompleteTodoAsync,
} from "./todoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover $deleteButton": {
      visibility: "visible",
    },
  },
  descriptionCompleted: {
    textDecoration: "line-through",
    color: theme.palette.text.disabled,
  },
  descriptionEditField: {
    marginRight: theme.spacing(2),
  },
  deleteButton: {
    visibility: "visible",
  },
}));

export const TodoItem = ({
  id,
  description,
  completed,
  onDescriptionUpdate,
}) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const dispatch = useDispatch();

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    setIsEditing(false);
    onDescriptionUpdate(editedDescription);
  };

  const updateEditedDescription = (event) => {
    event.preventDefault();
    setEditedDescription(event.target.value);
  };

  const toggleCompleted = (checked) => {
    if (checked) {
      dispatch(completeTodoAsync(id));
    } else {
      dispatch(uncompleteTodoAsync(id));
    }
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" && editedDescription.length > 0) {
      finishEditing();
    }
  };

  return (
    <ListItem
      role={undefined}
      dense
      button
      disableRipple
      className={classes.root}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={completed}
          onChange={(_, checked) => toggleCompleted(checked)}
        />
      </ListItemIcon>
      {isEditing ? (
        <TextField
          value={editedDescription}
          fullWidth
          className={classes.descriptionEditField}
          autoFocus
          onChange={updateEditedDescription}
          onKeyPress={handleSubmit}
          onBlur={finishEditing}
        />
      ) : (
        <ListItemText
          onClick={startEditing}
          className={completed ? classes.descriptionCompleted : undefined}
        >
          {description}
        </ListItemText>
      )}
      <ListItemSecondaryAction>
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(deleteTodoAsync(id))}
          className={classes.deleteButton}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
