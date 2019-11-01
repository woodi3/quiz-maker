import { Component, OnInit } from "@angular/core";
import theme from "src/app/theme";
import { Quiz } from "src/app/models/quiz";
import { Question } from "src/app/models";
import { QuizService } from "src/app/services/quiz.service";
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"]
})
export class AnalyticsComponent implements OnInit {
  theme = theme;
  currentQuizzes: Quiz[] = [];

  get accuracy(): number {
    const totalGrade = this.currentQuizzes
      .map(q => q.grade)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalQuizzes = this.currentQuizzes.length === 0 ? 1 : this.currentQuizzes.length;
    const avg = totalGrade / totalQuizzes;
    return +avg.toFixed();
  }

  get avgTime(): string {
    //arr of differences in milliseconds
    const timeArr = this.currentQuizzes.map(q =>
      moment(q.endTime).diff(moment(q.startTime))
    );
    //milliseconds added up
    const total = timeArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const count = timeArr.length === 0 ? 1 : timeArr.length;
    const avg = total/count;
    return avg > 0 ? moment.duration(avg).humanize() : 'N/A';
  }

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    this.currentQuizzes = this.quizService.getQuizzes();
  }

  getQuiz(id: number): Quiz {
    return this.quizService.getQuiz(id);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
