import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class CreateLobbyComponent {
  constructor(private gameService: GameService) {
    this.gameService.getPlayers().subscribe((players: any) => {
      console.log('players', players);
      this.players = players;
    });
    this.gameService.joinLobby();
  }

  gameId = this.gameService.getGameId();

  // players: any = []
  players: any = [
    {displayName: 'player1'},
    {displayName: 'player2'},
    {displayName: 'player3'},
    {displayName: 'player4'},
    {displayName: 'player5'},
    {displayName: 'player6'},
    {displayName: 'player1'},
    {displayName: 'player2'},
    {displayName: 'player3'},
    {displayName: 'player4'},
    {displayName: 'player5'},
    {displayName: 'player6'},
    {displayName: 'player1'},
    {displayName: 'player2'},
    {displayName: 'player3'},
    {displayName: 'player4'},
    {displayName: 'player5'},
    {displayName: 'player6'},
  ]

}