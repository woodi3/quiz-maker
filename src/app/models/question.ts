import {Choice} from './choice'
export class Question {
    id: number;
    text: string;
    type: 'SINGLE' | 'MULTIPLE' | 'TEXT';
    totalPoints: number;
    choices: Choice[] = [];
    correctChoiceIds: number[] = [];

    get isAnswered(): boolean {
        return this.choices.some(c => c.hasAnswer);
    }

    get isCorrect(): boolean {
        const answeredChoiceIds = this.choices
            .filter(c => c.hasAnswer)
            .map(c => c.id);
        return JSON.stringify(this.correctChoiceIds) === JSON.stringify(answeredChoiceIds);
    }

    constructor(obj?: Question){
        if(obj){
            Object.assign(this, obj);
            if (obj.choices) {
              this.choices = obj.choices.map(c => new Choice(c));
            }
        }
        
    }
}