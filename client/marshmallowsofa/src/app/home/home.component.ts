import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private gameService: GameService
  ) { }

  createLobby() {
    this.http.get<{ gameId: string }>('http://localhost:3000/createLobby', {
      withCredentials: false
    }).subscribe((data: { gameId: string }) => {
      this.gameService.setGameId(data.gameId);
      this.router.navigate(['lobby'])
    });
  }
}
