import { Component, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  @Input() player!: any;

  isHost = false;
  id: string | null = '';

  constructor(private gameService: GameService) { 
    this.gameService.isHostObservable.subscribe((isHost: boolean) => {
      this.isHost = isHost;
    });
    this.id = this.gameService.socketId
  }
}
