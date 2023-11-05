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
  constructor(
    private gameService: GameService,
  ) { 
    this.gameService.getPlayers().subscribe((players: any) => {
      this.players = players;
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
    copiedMessage.classList.add('duration-200');
    copyLinkButton?.appendChild(copiedMessage);
    /* Remove the "copied to clipboard" message after 1 second. */
    setTimeout(() => {
      copiedMessage.remove();
    }, 3000);
  }
}