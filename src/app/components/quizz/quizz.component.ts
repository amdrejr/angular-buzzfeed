import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
  title:string = '';
  questions:object[] = [];
  questionSelected:any = null;

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string) {
    this.answers.push(value);
    this.nextQuestion();
  }

  nextQuestion() {
    this.questionIndex++;
    if(this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.answerSelected = quizz_questions.results[this.checkResult(this.answers) as keyof typeof quizz_questions.results];
    }
  }

  checkResult(answers:string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (arr.filter((item) => item === prev).length >
          arr.filter((item) => item === curr).length) {
        return prev;
      }
      else return curr;
    })
    return result;
  }

  restart() {
    window.location.reload();
  }
}
