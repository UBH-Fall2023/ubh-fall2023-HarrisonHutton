function createNewGame(gameId) {
    const newGame = {
        gameId: gameId,
        playerIds: [],
    }
    return newGame;
}


export {
    createNewGame
}