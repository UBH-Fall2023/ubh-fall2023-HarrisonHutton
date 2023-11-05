import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameId: string | null = null

  private players = this.socket.fromEvent<any>('update-lobby');

  constructor(private socket: Socket) { }

  joinLobby(): void {
    this.socket.emit('join-lobby', this.gameId, 'player1');
  }

  getPlayers(): Observable<any> {
    return this.players;
  }

  // Getter for game ID
  getGameId(): string | null {
    return this.gameId;
  }

  // Setter for game ID
  setGameId(id: string): void {
    this.gameId = id;
  }
}
