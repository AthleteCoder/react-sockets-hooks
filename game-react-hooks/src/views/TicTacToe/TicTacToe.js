import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import useGameSocket from "../../hooks/useGameSocket";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { GameDesign } from "./GameDesign/GameDesign";
import Alert from "@material-ui/lab/Alert";
import useTimer from "../../hooks/useTimer";

export const TicTacToe = () => {
  const match = useRouteMatch();
  const [gameState, selectBox] = useGameSocket(match.params.id);
  const user = useSelector((user) => user.userReducer);
  const [timeLeft, setTimeLeft] = useTimer(60, 1000);
  const history = useHistory();

  const handleBoxSelection = (box) => {
    if (!gameState.paused && gameState.playerTurn === user._id) {
      selectBox(box);
    }
  };

  const GameStateNotification = () => {
    return gameState.paused ? (
      <Alert severity="info">Waiting for other player to join... ({timeLeft})</Alert>
    ) : gameState.playerTurn === user._id ? (
      <Alert severity="success">Your Turn!</Alert>
    ) : (
          <Alert severity="warning">Your opponent turn!</Alert>
        )
  }

  useEffect(() => {
    if (timeLeft === 0 && gameState && gameState.players.length < 2) {
      history.push("/lobby")
    }
    if (gameState && gameState.players.length >= 2 && timeLeft > 0) {
      setTimeLeft(0);
    }
  }, [timeLeft, gameState, history]);

  console.log(gameState)

  if (!gameState) return <h1>Loading...</h1>;

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      style={{ marginTop: "24px" }}>
      <Grid>
        <Chip
          avatar={<Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>}
          label={user.email}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <Paper>
          {!gameState.won && <GameStateNotification />}
          {gameState.won && (gameState.won === user._id ?
            <Alert severity="success">You Won!!!</Alert> :
            <Alert severity="error">You lost !</Alert>)}

          <GameDesign game={gameState} boxSelected={handleBoxSelection} />
        </Paper>
      </Grid>
      <Grid>
        {gameState.players
          .filter((p) => p.id !== user._id)
          .map((opp, i) => (
            <Chip
              key={i}
              avatar={<Avatar>{opp.email.charAt(0).toUpperCase()}</Avatar>}
              label={opp.email}
              variant="outlined"
            />
          ))}
      </Grid>
    </Grid>
  );
};
