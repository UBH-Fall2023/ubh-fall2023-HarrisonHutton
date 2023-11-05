import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.css']
})
export class PromptsComponent {

  constructor(
    private gameService: GameService
  ) { 
    this.gameService.isMainScreenObservable.subscribe((isMainScreen: boolean) => {
      this.isMainScreen = isMainScreen;
    });
  }

  isMainScreen = false;

}
