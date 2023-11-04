function createNewGame(gameId) {
    const newGame = {
        gameId: gameId,
        /*list of players 
        each player is defined as:
        type: player {
            id: string,
            displayName: string,
        }
        */
        players: [],
    }
    return newGame;
}


export {
    createNewGame
}