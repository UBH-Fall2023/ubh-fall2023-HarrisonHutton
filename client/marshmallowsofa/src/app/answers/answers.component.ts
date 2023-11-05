import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {
  constructor(
    private gameService: GameService
  ) { 
    this.gameService.isMainScreenObservable.subscribe((isMainScreen: boolean) => {
      this.isMainScreen = isMainScreen;
    });
  }

  isMainScreen = false;
}
