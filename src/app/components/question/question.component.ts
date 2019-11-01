import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, Choice } from 'src/app/models';
import theme from 'src/app/theme';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() num: number;
  @Output() onAnswer: EventEmitter<void> = new EventEmitter<void>();
  theme = theme;

  constructor() { }

  ngOnInit() {
  }

  answer(choice: Choice): void {
    choice.hasAnswer = true;
    this.question.choices.forEach(c => {
      if(c.id !== choice.id) c.hasAnswer = false;
    });
    setTimeout(() => this.onAnswer.emit(), 1000);
  }
}
