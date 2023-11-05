import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

export type Answer = {
  promptText: string;
  answerText: string;
}

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
  socketId: string | null = null;
  private currentPrompt = new BehaviorSubject<string>('');
  private currentAnswers = new BehaviorSubject<Answer[]>([]);

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.socket.on('connect', () => {
      this.socketId = this.socket.ioSocket.id;
    });

    this.socket.fromEvent<any>('set-host').subscribe(() => {
      this.isHost.next(true);
    });

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

    this.socket.fromEvent<any>('receive-prompt').subscribe((prompt) => {
      this.currentPrompt.next(prompt);
    });

    this.socket.fromEvent<any>('all-answers-submitted').subscribe(() => {
      this.router.navigate(['slideshow']);
    });

    this.socket.fromEvent<any>('receive-answers').subscribe((answers) => {
      console.log('Received answers from the server!');
      this.currentAnswers.next(answers);
    });

    const audio = new Audio();
    audio.src = '../../assets/music/marshmallow-sofa.mp3';
    audio.load();
    audio.play();
    audio.loop = true;
  }

  get currentAnswersObservable(): Observable<Answer[]> {
    return this.currentAnswers.asObservable();
  }

  get currentPromptObservable(): Observable<string> {
    return this.currentPrompt.asObservable();
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

  submitAnswer(prompt: string, answer: string): void {
    let round = 1
    this.socket.emit('submit-answer', this.gameId, round, prompt, answer)
  }
}
