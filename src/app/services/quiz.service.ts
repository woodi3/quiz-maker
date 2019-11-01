import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizzes: Quiz[] = [];
  startNew: boolean = true;
  
  constructor() { }

  getQuizzes(): Quiz[] {
    let storedQuizzes: Quiz[] = []
    if(localStorage.getItem('quizzes')){
      storedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
      this.quizzes = storedQuizzes.map(q => new Quiz(q));
    }
    return this.quizzes;
  }
  getQuiz(id: number): Quiz {
    const idx = this.quizzes.findIndex(q => q.id === id);
    return idx > -1 ? this.quizzes[idx]: undefined;
  }

  addQuiz(quiz: Quiz): void {
    if(!this.getQuiz(quiz.id)){
      this.quizzes.unshift(quiz);
    }
  }

  addQuizzes(quizzes: Quiz[]): void {
    this.quizzes = [...this.quizzes, ...quizzes];
  }
  setCurrentQuiz(quiz: Quiz): void {
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
  }
  getCurrentQuizFromStorage(): Quiz {
    if(localStorage.getItem('currentQuiz')){
      const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
      return new Quiz(quiz);
    }
    return undefined;
  }

  updateStorage(): void {
    localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
  }
  clearCurrentQuiz(): void {
    localStorage.removeItem('currentQuiz');
  }
}
