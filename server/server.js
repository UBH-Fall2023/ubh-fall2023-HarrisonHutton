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

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});



let gameRooms = {};


app.get('/createLobby', (_, res) => {
    
    let gameCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        gameCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const gameId = gameCode.toUpperCase(); // convert to uppercase
    const newGame = createNewGame(gameId);
    const newGameJSON = JSON.stringify(newGame);
    gameRooms[gameId] = newGame;
    res.send(newGameJSON);
})


io.on("connection", (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('connect-host', (gameId) => {
        /* Need to connect host separately because it doesn't have a 
         * player name. */
        socket.join(gameId);
    });

    socket.on('join-lobby', (gameId, playerName) => {
        /* Add the socket to a room based on the game id, so that we can
         * broadcast to all players in the room. */
        socket.join(gameId);
        console.log('gameId', gameId, 'playerName', playerName);
        const newPlayer = createNewPlayer(socket.id, playerName);
        if (gameRooms[gameId] === undefined) {
            console.log('ERROR: game not found');
            return;
        }
        gameRooms[gameId].players.push(newPlayer);
        const players = gameRooms[gameId].players;
        console.log('players', players);
        io.to(gameId).emit('update-lobby', players);
    });

    socket.on('leave-lobby', (gameId) => {
        gameRooms[gameId].players = gameRooms[gameId].players.filter(player => player.id !== socket.id);
        const players = gameRooms[gameId].players;
        socket.emit('update-lobby', players);
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

