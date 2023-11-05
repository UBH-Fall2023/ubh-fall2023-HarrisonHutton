function createNewGame(gameId) {
    const newGame = {
        gameId: gameId,
        /*list of players 
        each player is defined as:
        type: player {
            id: string,
            displayName: string,
            prompts: {
                round: int,
                text: string,
            },
        }
        */
        players: [],
        rounds: 1,
    }
    return newGame;
}

function createNewPlayer(id, displayName) {
    const newPlayer = {
        id: id,
        displayName: displayName,
        prompts: {},
    }
    return newPlayer;
}


export {
    createNewGame,
    createNewPlayer,
}