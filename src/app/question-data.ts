import { Question, Choice } from "./models";


const rawQuestionData = [
  {
    questionText: "In Greek mythology, who did Athena turn into a spider?",
    answer: "Arachne"
  },
  {
    questionText:
      "What musical character came from the easterly wind with an umbrella and carpet bag?",
    answer: "Mary Poppins"
  },
  {
    questionText:
      "Who was the last king of Troy killed by Achilles son Pyrrhus?",
    answer: "Priam"
  },
  {
    questionText: "What two girls do Archie and Reggie run around with?",
    answer: "Betty and Veronica"
  },
  {
    questionText:
      "What do most lobsters and crayfish do with their shell after it has molted?",
    answer: "Eat It"
  },
  {
    questionText: "How many chromosomes does a cow have?",
    answer: "60"
  },
  {
    questionText:
      "Which acid is the main gastric acid present in the human stomach?",
    answer: "Hydrochloric Acid"
  },
  {
    questionText: "What is a group of owls called?",
    answer: "A parliament"
  }
];

const rawChoiceData = [
"suit"
,"passenger"
,"unknown"
,"moldy"
,"notice"
,"crazy"
,"utter"
,"drop"
,"switch"
,"languid"
,"hand"
,"level"
,"grade"
,"spooky"
,"physical"
,"planes"
,"sock"
,"abrasive"
,"talk"
,"hill"
,"eight"
,"surprise"
,"flower"
,"carry"
,"fantastic"
,"slave"
,"page"
,"handsome"
,"tick"
,"disagreeable"
,"zephyr"
,"rain"
,"sleepy"
,"design"
,"birth"
,"dull"
,"small"
,"appliance"
,"milk"
,"rhetorical"
,"avoid"
,"unkempt"
,"expansion"
,"kitty"
,"serve"
,"decay"
,"erratic"
,"enchanted"
,"peace"
,"poised"
,"judge"
,"creature"
,"cars"
,"stiff"
,"apparel"
,"ambiguous"
,"plantation"
,"curl"
,"clammy"
,"whimsical"
,"deeply"
,"gaudy"
,"sleep"
,"rule"
,"unequal"
,"space"
,"spark"
,"zany"
,"fall"
,"sleet"
,"condition"
,"size"
,"system"
,"subdued"
,"unruly"
,"breathe"
,"mean"
,"able"
,"disturbed"
,"macho"
,"shoes"
,"groan"
,"staking"
,"possessive"
,"alike"
,"rub"
,"jog"
,"book"
,"pick"
,"mine"
,"lethal"
,"memory"
,"threatening"
,"dam"
,"release"
,"shock"
,"yell"
,"sail"
,"tramp"
,"refuse"
];

const questions: Question[] = [];
let choiceIdx = 0;
rawQuestionData.forEach((q,qIdx) => {
    const question = new Question();
    question.id = qIdx+1;
    question.type = 'SINGLE';
    question.totalPoints = 1;
    question.text = q.questionText;
    const choices = [];
    const correctChoice = new Choice();
    correctChoice.id = choiceIdx+1;
    correctChoice.text = q.answer;
    question.correctChoiceIds.push(correctChoice.id);
    choices.push(correctChoice);
    for(let i = 0; i < 3; i++){
        choiceIdx++;
        const c = new Choice();
        const r = Math.floor(Math.random() * rawChoiceData.length);
        c.id = choiceIdx+1;
        c.text = rawChoiceData[r];
        choices.push(c);
    }
    question.choices = choices;
    questions.push(question);
});

export default questions;

