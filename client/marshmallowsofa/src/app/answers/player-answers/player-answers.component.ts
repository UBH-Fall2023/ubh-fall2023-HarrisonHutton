import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-answers',
  templateUrl: './player-answers.component.html',
  styleUrls: ['./player-answers.component.css']
})
export class PlayerAnswersComponent {

  submittedAnswer = false;

  constructor(
    private gameService: GameService
  ) { }

  submitAnswer() {
    /* Get the prompt from the submitted form. */
    const answer = (document.getElementById('answer') as HTMLInputElement).value;
    this.gameService.submitAnswer(answer);
    this.submittedAnswer = true;
  }
  
}
