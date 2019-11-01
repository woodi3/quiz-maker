
export class Choice {
    id: number;
    text: string;
    hasAnswer: boolean;

    constructor(obj?: Choice){
        if(obj){
            Object.assign(this, obj);
        }
    }
}