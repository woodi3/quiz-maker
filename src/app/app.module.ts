import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { QuizComponent } from './views/quiz/quiz.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { SettingsComponent } from './views/settings/settings.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizFooterComponent } from './components/quiz-footer/quiz-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    AnalyticsComponent,
    SettingsComponent,
    QuestionComponent,
    QuizFooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private library: FaIconLibrary){
    library.addIconPacks(fas, far);
  }
}
