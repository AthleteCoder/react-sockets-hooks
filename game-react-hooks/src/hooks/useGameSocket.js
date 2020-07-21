import io from "socket.io-client";
import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { getGameState } from "../api/services/RoomService";

const useGameSocket = (id) => {
  // const [messages, setMessages] = useState([]);
  const socket = useCallback(io("ws://localhost:8080/" + id), [id]);
  const user = useSelector((user) => user.userReducer);
  const [gameState, setGameState] = useState(null);

  const addNewMessage = useCallback(
    (msg) => {
      socket.emit("message", msg);
    },
    [socket]
  );

  const selectBox = (box) => {
    socket.emit("boxselected", {
      gameId: id,
      box: box,
      email: user.email,
    });
  };

  useEffect(() => {
    (async () => {
      const game = await getGameState(id);
      setGameState(game.data);
      socket.emit("joined", {
        id: user.id,
        email: user.email,
      });

      socket.on("stateupdate", (game) => {
        setGameState(game);
      });
    })();

    return () => {
      socket.disconnect();
    };
  }, [socket, user.id, user.email, id]);

  return [gameState, selectBox, addNewMessage];
};

export default useGameSocket;
