import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute
  ) { }

  /* If a player goes to the url: <url>/?gameId=<gameId>, then redirect the player
   * to a join game page, with that gameId now set as the gameId on the client side. */
  ngOnInit(): void {
    const gameId = this.route.snapshot.queryParamMap.get('gameId');
    if (gameId) {
      this.gameService.setGameId(gameId);
      this.router.navigate(['join']);
    }
  }

  createLobby() {
    this.http.get<{ gameId: string }>('http://localhost:3000/createLobby', {
      withCredentials: false
    }).subscribe((data: { gameId: string }) => {
      this.gameService.setGameId(data.gameId);
      /* Send a websocket message to the server to join the game as the host. */
      this.gameService.connectHost();
      this.gameService.isMainScreenObservable = true;
      this.router.navigate(['lobby'])
    });
  }
}
