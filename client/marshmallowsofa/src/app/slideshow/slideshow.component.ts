import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent {

  constructor(
    private gameService: GameService
  ) { 
    this.gameService.isMainScreenObservable.subscribe((isMainScreen: boolean) => {
      this.isMainScreen = isMainScreen;
    });
  }

  isMainScreen = false;

}
