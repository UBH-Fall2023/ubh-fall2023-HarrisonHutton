import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameId: string | null = null

  private players = new BehaviorSubject<any[]>([]);

  constructor(private socket: Socket) {
    this.socket.fromEvent<any>('update-lobby').subscribe((players: any) => {
      this.players.next(players);
    });
  }

  connectHost(): void {
    this.socket.emit('connect-host', this.gameId);
  }

  joinLobby(playerName: string): void {
    this.socket.emit('join-lobby', this.gameId, playerName);
  }

  getPlayers(): Observable<any[]> {
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
