import express from 'express'
import { Server } from 'socket.io';
import * as http from 'http';
import {v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { createNewGame, createNewPlayer } from './gameHandlers/newGame.js'

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
    
    const gameCode = uuidv4().substring(0, 8); // generate an 8-character game ID using uuidv4
    const gameId = gameCode.toUpperCase(); // convert to uppercase
    const newGame = createNewGame(gameId);
    const newGameJSON = JSON.stringify(newGame);
    gameRooms[gameId] = newGame;
    res.send(newGameJSON);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

io.on("connection", (socket) => {
    socket.on('join-lobby', (gameId, playerName) => {
        const newPlayer = createNewPlayer(socket.id, playerName);
        gameRooms[gameId].players.push(newPlayer);
        const players = gameRooms[gameId].players;
        socket.broadcast.emit('update-lobby', players);
    });

    socket.on('leave-lobby', (gameId) => {
        gameRooms[gameId].players = gameRooms[gameId].players.filter(player => player.id !== socket.id);
        const players = gameRooms[gameId].players;
        socket.broadcast.emit('update-lobby', players);
    });

    socket.on('start-game', (gameId) => {
        socket.broadcast.emit('start-game', gameId);
    });

    socket.on('update-rounds', (gameId, rounds) => {
        gameRooms[gameId].rounds = rounds;
        socket.broadcast.emit('update-rounds', gameId, rounds);
    });

    socket.on('submit-prompts', (gameId, round, promptText) => {
        const player = gameRooms[gameId].players.find(player => player.id === socket.id);
        player.prompts[round] = promptText;
        player.hasSubmittedPrompt = true;
        const allPlayersSubmitted = gameRooms[gameId].players.every(player => player.hasSubmittedPrompt);
        if (allPlayersSubmitted) {
            io.emit('all-prompts-submitted', gameId);
        }
    });
});

