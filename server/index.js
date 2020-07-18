const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const bodyParser = require("body-parser");
const mongoDb = require("mongoose");
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

mongoDb.connect("mongodb://localhost:27017/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log(err);
    } else console.log("Mongodb connected successfully!")
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use('/', routes);


io.of('lobby').on('connection', socket => {
    socket.on("message", (msg) => {
        io.of('lobby').emit('message', msg);
    })
})


server.listen(8080, () => console.log('Listening on port 8080'));