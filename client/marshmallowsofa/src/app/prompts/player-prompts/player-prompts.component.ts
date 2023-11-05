import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-prompts',
  templateUrl: './player-prompts.component.html',
  styleUrls: ['./player-prompts.component.css']
})
export class PlayerPromptsComponent {

  submittedPrompt = false;

  constructor(
    private gameService: GameService
  ) { }

  submitPrompt() {
    /* Get the prompt from the submitted form. */
    const prompt = (document.getElementById('prompt') as HTMLInputElement).value;
    this.gameService.submitPrompt(prompt);
    this.submittedPrompt = true;
  }

}
