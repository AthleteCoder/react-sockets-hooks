import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../../../utils/useForm";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5),
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
}));

const NewGame = ({ open, newGame, close }) => {
  const classes = useStyles();
  const [title, handleTitleChange] = useForm("");
  const handleClose = () => {
    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newGame(title);
    close();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle className={classes.dialogTitle}>New Game</DialogTitle>
      <IconButton onClick={handleClose} className={classes.closeButton}>
        <CloseIcon />
      </IconButton>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          value={title}
          onChange={handleTitleChange}
          required
          id="standard-basic"
          label="Title"
        />
        <Button color="primary" type="submit">
          Start
        </Button>
      </form>
    </Dialog>
  );
};

export default NewGame;
