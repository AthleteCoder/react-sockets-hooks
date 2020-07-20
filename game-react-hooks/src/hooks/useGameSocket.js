import io from "socket.io-client";
import {
    useEffect,
    useCallback,
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
    const socket = useCallback(io("ws://localhost:8080/" + id), [id]);
    const user = useSelector(user => user.userReducer);
    const [opponents, setOpponents] = useState([])
    const [gameData, setGameData] = useState([]);
    const [myTurn, setMyTurn] = useState(false)

    const addNewMessage = useCallback((msg) => {
        socket.emit("message", msg);
    }, [socket]);

    const selectBox = (box) => {
        socket.emit("boxselected", {
            gameId: id,
            box: box,
            email: user.email
        })
    }

    useEffect(() => {
        (async () => {
            const game = await getGameState(id);

            setOpponents(game.data.players);
            setGameData(game.data.state);
            socket.emit("joined", {
                id: user.id,
                email: user.email
            });
            socket.on("joined", user => {
                console.log(user)
                setOpponents(prev => [...prev, user]);
            })

            socket.on("stateupdate", (game) => {
                setGameData(game.gameState);
            })
        })()

        return () => {
            socket.disconnect();
        }

    }, [socket, user.id, user.email, id])

    return [opponents, gameData, myTurn, selectBox, addNewMessage];
};

export default useGameSocket;