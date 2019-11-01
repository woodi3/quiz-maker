import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { confetti } from "dom-confetti";
import theme from 'src/app/theme';

@Component({
  selector: "quiz-footer",
  templateUrl: "./quiz-footer.component.html",
  styleUrls: ["./quiz-footer.component.css"]
})
export class QuizFooterComponent implements OnInit, OnChanges {
  @ViewChild("percentage", { static: false }) percentageRef: ElementRef;
  @Input() completion: number = 0;
  @Input() disableNext: boolean = true;
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  showConfetti: boolean = false;
  theme = theme;
  constructor() {}

  ngOnInit() {}
  ngOnChanges(){
    if (this.completion === 100) {
      confetti(this.percentageRef.nativeElement);
    }
  }
}
