class TicTacToeGame {
    constructor(io, id) {
        this.io = io;
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.maxPlayers = 2;
        this.paused = true;
        this.playerOptions = ['X', 'Y'];
        this.players = [];
        this.id = id;
        this.io.of(id).on('connection', (socket) => {
            socket.on("message", (msg) => {
                io.of(id).emit("message", msg);
            });
            socket.on("joined", (user) => {
                this.newPlayer(user);
                socket.on("disconnect", () => {
                    this.playerLeft(user);
                })
            })
            socket.on("boxselected", data => {
                this.handleBoxSelected(data);
            })
        })
    }

    newPlayer(player) {
        this.players.push(player);
    }

    playerLeft(player) {
        this.players = this.players.filter(p => p.id === player.id);
    }

    handleBoxSelected(data) {

    }
}