import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import theme from "src/app/theme";
import { QuizService } from 'src/app/services/quiz.service';

class NavItem {
  header: string;
  subHeader: string;
  tooltip: string;
  icon: [string, string];
  route: string;
  backgroundColor: string;
  textColor: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  navItems: NavItem[] = [];
  theme = theme;
  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    this.initNavItems();
  }

  initNavItems(): void {
    
    this.navItems = [
      {
        header: "Start New Quiz",
        subHeader: "begin a random quiz",
        icon: ["far", "file-alt"],
        route: "/quiz",
        backgroundColor: this.theme.darkBlue,
        textColor: "white",
        tooltip: "Start a random quiz"
      },
      {
        header: "View Your Results",
        subHeader: "all your quiz statistics",
        icon: ["fas", "history"],
        route: "/analytics",
        backgroundColor: this.theme.blue,
        textColor: "white",
        tooltip: "View quiz stats"
      },
      // {
      //   header: "User Settings",
      //   subHeader: "change personal settings",
      //   icon: ["fas", "cogs"],
      //   route: "/settings",
      //   backgroundColor: this.theme.teal,
      //   textColor: "white",
      //   tooltip: "Change your personal settings"
      // }
    ];
    if (this.quizService.getCurrentQuizFromStorage()) {
      this.navItems.unshift({
        header: "Resume Quiz",
        subHeader: "finish a quiz",
        icon: ["fas", "arrow-right"],
        route: "/quiz",
        backgroundColor: this.theme.success,
        textColor: "white",
        tooltip: "Finish a quiz"
      });
    }
  }

  navigate(item: NavItem): void {
    if(item.header.includes('Resume')){
      this.quizService.startNew = false;
    }
    this.router.navigate([item.route]);
  }

}
