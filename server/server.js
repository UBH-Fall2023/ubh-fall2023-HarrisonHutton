import express from 'express'
import { Server } from 'socket.io';
import * as http from 'http';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import { createNewGame } from './gameHandlers/newGame.js'

const app = express()

const corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions));

const port = 3000
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});



let gameRooms = {};

app.get('/createLobby', (_, res) => {
    const gameId = uuidv4();
    const newGame = createNewGame(gameId);
    const newGameJSON = JSON.stringify(newGame);
    gameRooms[gameId] = newGame;
    res.send(newGameJSON);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

io.on("connection", (socket) => {
    socket.on('join-lobby', (gameId) => {
        gameRooms[gameId].playerIds.push(socket.id);
        const playerIds = gameRooms[gameId].playerIds;
        socket.broadcast.emit('update-lobby', playerIds);
    });

    socket.on('leave-lobby', (gameId) => {
        gameRooms[gameId].playerIds = gameRooms[gameId].playerIds.filter(playerId => playerId !== socket.id);
        const playerIds = gameRooms[gameId].playerIds;
        socket.broadcast.emit('update-lobby', playerIds);
    });
});

