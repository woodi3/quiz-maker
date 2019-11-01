import { Question } from './question';

export class Quiz {
    id: number;
    questions: Question[] = [];
    startTime: Date;
    endTime: Date;

    get grade(): number {
        const totalPossiblePoints = this.questions
            .map(q => q.totalPoints)
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue
            , 0);
        const totalPoints = this.questions
          .filter(q => q.isCorrect)
          .map(q => q.totalPoints)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue
          , 0);
          const grade = (totalPoints / totalPossiblePoints) * 100;
        return +grade.toFixed();
    }

    get completion(): number {
        const val = (this.questions.filter(q => q.isAnswered).length / this.questions.length) * 100;
        return +val.toFixed();
    }

    get isComplete(): boolean {
        return this.questions.every(q => q.isAnswered);
    }

    constructor(obj?){
        if(obj){
            Object.assign(this, obj);
            if(this.questions){
                this.questions = this.questions.map(q => new Question(q));
            }
        }
    }
}