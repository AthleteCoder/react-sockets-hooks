import io from "socket.io-client";
import {
  useEffect,
  useState
} from "react";
import {
  useSelector
} from "react-redux";
import {
  getGameState
} from "../api/services/RoomService";

const useGameSocket = (id) => {
  // const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const user = useSelector((user) => user.userReducer);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    setSocket(io("ws://localhost:8080/" + id));
  }, [id])

  const addNewMessage =
    (msg) => {
      socket.emit("message", msg);
    }

  const selectBox = (box) => {
    socket.emit("boxselected", {
      gameId: id,
      box: box,
      email: user.email,
    });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joined", {
        id: user._id,
        email: user.email,
      });
      (async () => {
        const game = await getGameState(id);
        setGameState(game.data);
        socket.on("stateupdate", (game) => {
          setGameState(game);
        });
      })();
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, user._id, user.email, id]);

  return [gameState, selectBox, addNewMessage];
};

export default useGameSocket;