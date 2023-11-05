import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-answers',
  templateUrl: './player-answers.component.html',
  styleUrls: ['./player-answers.component.css']
})
export class PlayerAnswersComponent {

  submittedAnswer = false;
  prompt: string = '';

  constructor(
    private gameService: GameService
  ) { 
    this.gameService.currentPromptObservable.subscribe((prompt: string) => {
      this.prompt = prompt;
    });
  }

  submitAnswer() {
    /* Get the prompt from the submitted form. */
    const answer = (document.getElementById('answer') as HTMLInputElement).value;
    this.gameService.submitAnswer(this.prompt, answer);
    this.submittedAnswer = true;
    /* Prevent the form from refreshing the page. */
    return false;
  }
  
}
