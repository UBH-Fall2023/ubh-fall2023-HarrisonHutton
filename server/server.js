import express from 'express'
import { Server } from 'socket.io';
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
        /* Look up the game by gameId and set the hostClientId. */
        gameRooms[gameId].hostClientId = socket.id;
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
        if (gameRooms[gameId].players.length === 1) {
            /* If this is the first player to join, make them the host. */
            newPlayer.isHost = true;
            io.to(socket.id).emit('set-host');
        }
        const players = gameRooms[gameId].players;
        const data = {
            players: players,
            socketId: socket.id
        }
        console.log('players', players);
        io.to(gameId).emit('update-lobby', data);
    });

    socket.on('leave-lobby', (gameId) => {
        gameRooms[gameId].players = gameRooms[gameId].players.filter(player => player.id !== socket.id);
        const players = gameRooms[gameId].players;
        socket.emit('update-lobby', players);
    });

    socket.on('start-game', (gameId) => {
        io.to(gameId).emit('start-game');
    });

    socket.on('update-rounds', (gameId, rounds) => {
        gameRooms[gameId].rounds = rounds;
        socket.broadcast.emit('update-rounds', gameId, rounds);
    });

    socket.on('submit-prompt', (gameId, round, promptText) => {
        const player = gameRooms[gameId].players.find(player => player.id === socket.id);
        player.prompts[round] = promptText;
        player.hasSubmittedPrompt = true;
        const allPlayersSubmitted = gameRooms[gameId].players.every(player => player.hasSubmittedPrompt);
        if (allPlayersSubmitted) {
            io.to(gameId).emit('all-prompts-submitted', gameId);
            /* Send every socket the prompt that it will be answering. Each
             * socket will get a random prompt that was not their own and no
             * two sockets will get the same prompt. */
            let playerSet = new Set(gameRooms[gameId].players);
            gameRooms[gameId].players.forEach(player => {
                const otherPlayers = Array.from(playerSet).filter(otherPlayer => otherPlayer.id !== player.id);
                const randomPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
                const prompt = randomPlayer.prompts[round];
                /* Remove this random player from the set so that their prompt
                 * doesn't get chosen twice. */
                playerSet.delete(randomPlayer);
                io.to(player.id).emit('receive-prompt', prompt)
            });
            /* Reset hasSubmittedPrompt for the next round. */
            gameRooms[gameId].players.forEach(player => player.hasSubmittedPrompt = false);
        }
    });

    socket.on('submit-answer', (gameId, round, promptText, answerText) => {
        const player = gameRooms[gameId].players.find(player => player.id === socket.id);
        player.answers[round] = {
            promptText: promptText,
            answerText: answerText,
        };
        player.hasSubmittedAnswer = true;
        const allPlayersSubmitted = gameRooms[gameId].players.every(player => player.hasSubmittedAnswer);
        if (allPlayersSubmitted) {
            io.to(gameId).emit('all-answers-submitted', gameId);
            const answers = gameRooms[gameId].players.map(player => player.answers[round]);
            console.log('answers', answers);
            io.to(gameId).emit('receive-answers', answers);
            /* Reset hasSubmittedAnswer for the next round. */
            gameRooms[gameId].players.forEach(player => player.hasSubmittedAnswer = false);
        }
    });
});

