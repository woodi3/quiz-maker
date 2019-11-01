import { Component, OnInit } from '@angular/core';
import theme from 'src/app/theme';
import questions from 'src/app/question-data';
import { Location } from '@angular/common';
import { Quiz } from 'src/app/models/quiz';
import { Question } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  
  theme = theme;

  quiz: Quiz;
  currentQuizzes: Quiz[] = [];
  currNum: number = 1;

  constructor(private location: Location, 
    private quizService: QuizService,
    private router: Router) {}

  ngOnInit() {
    this.currentQuizzes = this.quizService.getQuizzes();
    this.quizService.updateStorage();
    this.quiz = this.getQuiz();
    this.quizService.addQuiz(this.quiz);
    this.quizService.setCurrentQuiz(this.quiz);
    if(!this.quizService.startNew){
      this.setCurrentNum();
    }
  }

  getQuiz(): Quiz {
    if(this.quizService.getCurrentQuizFromStorage() && !this.quizService.startNew){
      return this.quizService.getCurrentQuizFromStorage();
    }
    else {
      const quiz = new Quiz();
      quiz.id = this.currentQuizzes.length + 1;
      quiz.questions = [];
      quiz.startTime = new Date();
      for (let i = 0; i < 5; i++) {
        let r = Math.floor(Math.random() * questions.length);
        let question = questions[r];
        let idx = quiz.questions.findIndex(q => q.id === question.id);
        if (idx < 0) {
          quiz.questions.push(new Question(question));
        } else {
          //loop until we find an unused question
          while (idx > -1) {
            r = Math.floor(Math.random() * questions.length);
            question = questions[r];
            idx = quiz.questions.findIndex(q => q.id === question.id);
          }
          quiz.questions.push(new Question(question));
        }
      }
      return quiz;
    }
  }

  setCurrentNum(): void {
    const answeredQuestions = this.quiz.questions.filter(q => q.isAnswered);
    if(answeredQuestions.length > 0){
      const lastQuestion =
        answeredQuestions[answeredQuestions.length - 1];
      const idx = this.quiz.questions.findIndex(
        q => q.id === lastQuestion.id
      );
      this.currNum = idx+2;
    } else {
      this.currNum = 1;
    }
  }

  goBack(): void {
    this.location.back();
  }

  goNextQuestion(): void {
    if(this.currNum === this.quiz.questions.length) {
      this.quiz.endTime = new Date();
      this.quizService.setCurrentQuiz(this.quiz);
      this.quizService.updateStorage();
      this.quizService.clearCurrentQuiz();
      this.router.navigate(["/analytics"]);
      return;
    }
    this.currNum++;
    this.quizService.setCurrentQuiz(this.quiz);
    this.quizService.updateStorage();
  }
}
