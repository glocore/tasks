import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Todos } from "./features/todos/Todos";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectLoading } from "./features/todos/todoSlice";

const useStyles = makeStyles((theme) => ({
  todosWrapper: {
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  loadingIndicator: {
    color: "white",
  },
}));

function App() {
  const classes = useStyles();
  const loading = useSelector(selectLoading);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <CssBaseline />
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TinyList
          </Typography>
          {loading && <CircularProgress className={classes.loadingIndicator} />}
        </Toolbar>
      </AppBar>
      <div className={classes.todosWrapper}>
        <Todos />
      </div>
    </>
  );
}

export default App;
