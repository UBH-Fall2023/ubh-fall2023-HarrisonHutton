import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {

  isHost = false;

  constructor(
    private gameService: GameService,
  ) { 
    this.gameService.getPlayers().subscribe((players: any) => {
      this.players = players;
      console.log('players', this.players, 'this.players[0].id', this.players[0].id, 'this.gameService.getPlayerId()', this.gameService.getPlayerId())
      if (this.players.length > 0 && this.players[0].id === this.gameService.getPlayerId()) {
        this.gameService.isHostObservable = true;
      }
    });
    this.gameService.isHostObservable.subscribe((isHost: boolean) => {
      this.isHost = isHost;
    });
  }

  gameId = this.gameService.getGameId();

  // players: any = []
  players: any = [];

  getGameLink(): string {
    const gameLink = window.location.origin + '?gameId=' + this.gameId;
    return gameLink;
  }

  onCopySuccess(_: any): void {
    /* Append a temporary "copied to clipboard" message to the copy link button. */
    const copyLinkButton = document.getElementById('copy-to-clipboard');
    const copiedMessage = document.createElement('span');
    copiedMessage.innerText = 'Copied!';
    copiedMessage.classList.add('absolute');
    copiedMessage.classList.add('left-2');
    copiedMessage.classList.add('top-[88px]');
    copiedMessage.classList.add('text-md');
    copiedMessage.classList.add('uppercase');
    copiedMessage.classList.add('z-50');
    copiedMessage.classList.add('ease-out');
    copiedMessage.classList.add('duration-300');
    copyLinkButton?.appendChild(copiedMessage);
    /* Remove the "copied to clipboard" message after 1 second. */
    setTimeout(() => {
      copiedMessage.remove();
    }, 3000);
  }

  startGame(): void {
    this.gameService.startGame();
  }
}