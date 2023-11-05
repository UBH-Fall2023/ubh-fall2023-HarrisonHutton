import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  
  /* When we join a game, we should:
   * 1. Send a "join-lobby" message on the websocket connection, with the
   * entered name and gameId.
   * 2. Navigate to lobby page. 
  */

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  joinGame() {
    /* Get the player name from the submitted form. */
    const playerName = (document.getElementById('player-name') as HTMLInputElement).value;
    /* Add the player to the game by sending the player name and gameId to the server. */
    this.gameService.joinLobby(playerName);
    this.router.navigate(['lobby']);
  }
}
