import React, { useState } from "react";
import { newGame, joinGame } from "../../api/services/RoomService";
import DynTable from "../../components/DynTable/DynTable";
import NewGame from "./NewGame/NewGame";
import { useSelector } from "react-redux";
import useLobbySocket from "../../hooks/useLobbySocket";
import { Grid, Paper, List, TextField, Button } from "@material-ui/core";
import Message from "./Message";
import { useHistory } from "react-router-dom";

const Lobby = () => {
  const headers = [
    {
      name: "Title",
      prop: "title",
    },
    {
      name: "Created By",
      prop: "createdBy",
    },
    {
      name: "Type",
      prop: "type",
    },
    {
      name: "Created At",
      prop: "createdAt",
    },
  ];
  const [showNewItem, setShowNewItem] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [socketRooms, messages, addNewMessage] = useLobbySocket();
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleNewItem = () => {
    setShowNewItem(true);
  };

  const handleNewGame = (title) => {
    newGame(title, user.email).then((res) => {
      history.push("/tictactoe/" + res.data._id);
    });
  };

  const addMessage = () => {
    addNewMessage({ name: user.email, message: message });
    setMessage("");
  };

  const handleJoinGame = id => {
    joinGame(id).then(res => {
      history.push("/tictactoe/" + res.data._id);
    })
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <h2>Lobby</h2>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8}>
          <DynTable
            headers={headers}
            rows={socketRooms}
            newItem={handleNewItem}
            searchBy="title"
            handleAction={handleJoinGame}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            style={{
              margin: "0 10px 0 10px",
              maxHeight: "400px",
              minHeight: "400px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <List style={{ overflow: "scroll" }}>
              {messages.map((item, i) => (
                <Message key={i} {...item} />
              ))}
            </List>
            <TextField
              fullWidth
              variant="outlined"
              label="Type..."
              multiline
              rowsMax={4}
              rows={4}
              type="submit"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  addMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={addMessage}
                    variant="outlined"
                    color="primary"
                  >
                    Send
                  </Button>
                ),
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      <NewGame
        open={showNewItem}
        newGame={handleNewGame}
        close={() => setShowNewItem(false)}
      />
    </div>
  );
};

export default Lobby;
