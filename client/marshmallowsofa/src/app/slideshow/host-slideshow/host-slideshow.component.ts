import { Component, OnInit } from '@angular/core';
import { GameService, Answer } from 'src/app/services/game.service';

@Component({
  selector: 'app-host-slideshow',
  templateUrl: './host-slideshow.component.html',
  styleUrls: ['./host-slideshow.component.css']
})
export class HostSlideshowComponent implements OnInit {

  answers: Answer[] = [];
  tailwindStyles = ["text-3xl", "font-bold", "text-off-black", "uppercase", "font-bold", "transition-ease-in-out", "duration-300"];
  initialText = "All answers have been submitted. Let's see what you came up with!"

  constructor(
    private gameService: GameService
  ) { 
    this.gameService.currentAnswersObservable.subscribe((answers: Answer[]) => {
      this.answers = answers;
      console.log(this.answers);
    });
  }

  ngOnInit(): void {
    /* Append the initial text div to the card with id 'slideshow-box' */
    let slideshowBox = document.getElementById('slideshow-box');
    const initialTextDiv = this.createInitialTextDiv();
    if (slideshowBox) {
      slideshowBox.appendChild(initialTextDiv);
    }
    /* Remove the initial text div from the card with id 'slideshow-box' */
    // slideshowBox = document.getElementById('slideshow-box');
    // if (slideshowBox) {
    //   slideshowBox.removeChild(initialTextDiv);
    // }
    // for (let i = 0; i < this.answers.length + 1; i++) {
    //   i = i % this.answers.length;
    //   let promptDiv = this.createPromptDiv(this.answers[i]);
    //   let j = (i + 1) % this.answers.length;
    //   let answerDiv = this.createAnswerDiv(this.answers[j]);
    //   /* Add the prompt div to the card with id 'slideshow-box' */
    //   const slideshowBox = document.getElementById('slideshow-box');
    //   if (slideshowBox) {
    //     slideshowBox.classList.add('flex');
    //     slideshowBox.classList.add('flex-col'); 
    //     slideshowBox.classList.add('justify-center') 
    //     slideshowBox.classList.add('justify-center');
    //     slideshowBox.appendChild(promptDiv);
    //     slideshowBox.appendChild(answerDiv);
    //   }
    // }
  }

  createInitialTextDiv() {
    /* Create a span element with the initial text and return it as a string. */
    let initialTextDiv = document.createElement('span');
    for (let style of this.tailwindStyles) {
      initialTextDiv.classList.add(style);
    }
    initialTextDiv.innerText = this.initialText;
    return initialTextDiv;
  }

  createPromptDiv(answer: Answer) {
    let promptDiv = document.createElement('span');
    for (let style of this.tailwindStyles) {
      promptDiv.classList.add(style);
    }
    promptDiv.innerText = "what would you do if" + answer.promptText;
    return promptDiv;
  }

  createAnswerDiv(answer: Answer) {
    let answerDiv = document.createElement('span');
    for (let style of this.tailwindStyles) {
      answerDiv.classList.add(style);
    }
    answerDiv.innerText = answer.answerText;
    return answerDiv;
  }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

}
