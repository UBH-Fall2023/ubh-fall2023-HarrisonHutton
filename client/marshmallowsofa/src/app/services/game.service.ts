import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameId: string | null = null
  private playerId: string | null = null
  private players = new BehaviorSubject<any[]>([]);
  /* Used to determine if the client is the main screen or not. */
  private isMainScreen = new BehaviorSubject<boolean>(false);
  /* Used to determine if the client is the host of the game or not. */
  private isHost = new BehaviorSubject<boolean>(false);

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.socket.fromEvent<any>('update-lobby').subscribe((data) => {
      this.playerId = data.socketId;
      this.players.next(data.players);
    });

    this.socket.fromEvent<any>('start-game').subscribe(() => {
      this.router.navigate(['prompts']);
    });

    this.socket.fromEvent<any>('all-prompts-submitted').subscribe(() => {
      this.router.navigate(['answers']);
    });

    const audio = new Audio();
    audio.src = '../../assets/music/marshmallow-sofa.mp3';
    audio.load();
    audio.play();
    audio.loop = true;
  }

  get isHostObservable(): Observable<boolean> {
    return this.isHost.asObservable();
  }

  set isHostObservable(value: boolean) {
    this.isHost.next(value);
  }

  get isMainScreenObservable(): Observable<boolean> {
    return this.isMainScreen.asObservable();
  }

  set isMainScreenObservable(value: boolean) {
    this.isMainScreen.next(value);
  }

  connectHost(): void {
    this.socket.emit('connect-host', this.gameId);
  }

  joinLobby(playerName: string): void {
    this.socket.emit('join-lobby', this.gameId, playerName);
  }

  startGame(): void {
    this.socket.emit('start-game', this.gameId);
  }

  getPlayers(): Observable<any[]> {
    return this.players;
  }

  getPlayerId(): string | null {
    return this.playerId;
  }

  // Getter for game ID
  getGameId(): string | null {
    return this.gameId;
  }

  // Setter for game ID
  setGameId(id: string): void {
    this.gameId = id;
  }

  submitPrompt(prompt: string): void {
    let round = 1
    this.socket.emit('submit-prompt', this.gameId, round, prompt);
  }

  submitAnswer(answer: string): void {
    let round = 1
    this.socket.emit('submit-answer', this.gameId, round, answer)
  }
}
