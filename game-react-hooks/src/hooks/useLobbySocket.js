import io from "socket.io-client";
import {
  useEffect,
  useState,
  useCallback
} from "react";
import {
  getAllRooms
} from "../api/services/RoomService";
const socket = io("ws://localhost:8080/lobby");

const useLobbySocket = () => {
  const [lobbyRooms, setLobbyRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const addNewMessage = useCallback((msg) => {
    socket.emit("message", msg);
  }, [])

  useEffect(() => {
    getAllRooms().then((res) => {
      setLobbyRooms(res.data);
    });
    socket.on("newroom", (data) => {
      setLobbyRooms((prevRooms) => [...prevRooms, data]);
    });
    socket.on("deleteroom", (roomId) => {
      setLobbyRooms((prevRooms) =>
        prevRooms.filter((item) => item._id === roomId)
      );
    });
    socket.on("message", (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return [lobbyRooms, messages, addNewMessage];
};

export default useLobbySocket;