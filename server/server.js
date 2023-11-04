const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000

let gameRooms = {};

app.get('/createLobby', (_, res) => {
    const gameId = uuid.v4();
    const gameIdPacket = {
        gameId: gameId
    }
    const gameIdJson = JSON.stringify(gameIdPacket);
    gameRooms[gameId] = [];
    res.send(gameIdJson);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})