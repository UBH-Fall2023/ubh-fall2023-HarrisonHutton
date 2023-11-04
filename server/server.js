import express from 'express'
import { Server } from 'socket.io';
import * as http from 'http';
import {v4 as uuidv4} from 'uuid';
import { createNewGame } from './gameHandlers/newGame.js'

const app = express()
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
        const playerIds = gameRooms[gameId].playerIds;
        socket.broadcast.emit('update-lobby', playerIds);
    });
});