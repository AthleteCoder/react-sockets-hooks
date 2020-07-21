import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Close from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(5),
    minWidth: "50px",
    minHeight: "50px",
    maxWidth: "50px",
    maxHeight: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#858585",
    },
  },
}));

export const GameDesign = ({ game, boxSelected }) => {
  return (
    <Grid container direction="column">
      {game.gameState.map((col, i) => (
        <Row key={i} row={col} rowNumber={i} boxSelected={boxSelected} />
      ))}
    </Grid>
  );
};

const Row = ({ row, rowNumber, boxSelected }) => {
  const classes = useStyles();

  return (
    <Grid container>
      {row.data.map((item, col) => (
        <Grid item xs={4} key={col}>
          <Paper
            onClick={() => boxSelected([rowNumber, col])}
            className={classes.paper}>
            {item === "O" ? (
              <RadioButtonUncheckedIcon style={{ fontSize: "50px" }} />
            ) : item === "X" ? (
              <Close style={{ fontSize: "50px" }} />
            ) : null}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
