import React from "react";
import { useRouteMatch } from "react-router-dom";
import useGameSocket from "../../hooks/useGameSocket";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { GameDesign } from "./GameDesign/GameDesign";
import Alert from "@material-ui/lab/Alert";

export const TicTacToe = () => {
  const match = useRouteMatch();
  const [gameState, selectBox] = useGameSocket(match.params.id);
  const user = useSelector((user) => user.userReducer);

  const handleBoxSelection = (box) => {
    if (!gameState.paused && gameState.playerTurn === user._id) {
      selectBox(box);
    }
  };

  console.log(gameState);

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
          {gameState.paused ? (
            <Alert severity="info">Waiting for other player to join...</Alert>
          ) : gameState.playerTurn === user._id ? (
            <Alert severity="success">Your Turn!</Alert>
          ) : (
            <Alert severity="warning">Your opponent turn!</Alert>
          )}
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
