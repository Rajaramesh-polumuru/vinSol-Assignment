const template = document.querySelector("template");
class Quiz {
  constructor(name) {
    this.createQuiz(name);
    this.number = 0;
    this.operator = 0;
    this.arr = ["*", "/", "+", "-"];
    this.questionAndAnswerList = {};
    this.userAnswerList = {};
    this.RN1 = 0;
    this.button = document.getElementById(name + "-button");
    this.RN2 = 0;
    this.RO = "";
    this.quesArray = [];
    this.marks = 0;
    this.name = name;
  }
  getRandomOperator() {
    return this.arr[Math.floor(Math.random() * 4)];
  }
  getRandomNumber() {
    return Math.ceil(Math.random() * 9);
  }
  updateDOM(prop) {
    // console.log(document.getElementById(prop + "-second-operand"));
    document.getElementById(prop + "-first-operand").innerHTML = this.RN1;
    document.getElementById(prop + "-second-operand").innerHTML = this.RN2;
    document.getElementById(prop + "-operator").innerHTML = this.RO;
  }
  createQuiz(name) {
    const node = document.importNode(template.content, true);
    document.body.appendChild(node);
    document.getElementById("button").id = name + "-button";
    document.getElementById("input").id = name + "-input";
    document.getElementById("operator").id = name + "-operator";
    document.getElementById("first-operand").id = name + "-first-operand";
    document.getElementById("second-operand").id = name + "-second-operand";
    document.getElementById("half").id = name + "-half";
  }
  validate() {
    for (const key in this.userAnswerList) {
      if (this.userAnswerList[key] === this.questionAndAnswerList[key])
        this.marks++;
    }
  }
  printResults() {
    this.validate();
    let list = this.quesArray;

    document.getElementById(this.name + "-half").id = this.name + "-results";
    document.getElementById(
      this.name + "-results"
    ).innerHTML = `Result is ${this.marks}`;
  }
}
var calculate = {
  "+": function (x, y) {
    return x + y;
  },
  "-": function (x, y) {
    return x - y;
  },
  "*": function (x, y) {
    return x * y;
  },
  "/": function (x, y) {
    return x / y;
  },
};

let rightQuiz = new Quiz("right");
let leftQuiz = new Quiz("left");

let leftCount = 0;

const leftQuizStart = () => {
  console.log("left Started");
  if (leftCount < 10) {
    document.getElementById("left-button").innerText = "Next Question";
  } else {
    document.getElementById("left-button").innerText = "Finish Quiz";
  }
  leftCount++;
  let input = document.getElementById("left-input").value;
  //   console.log(input);
  leftQuiz.RN1 = leftQuiz.getRandomNumber();
  leftQuiz.RN2 = leftQuiz.getRandomNumber();
  leftQuiz.RO = leftQuiz.getRandomOperator();
  leftQuiz.updateDOM("left");

  let answer = Math.floor(calculate[leftQuiz.RO](leftQuiz.RN1, leftQuiz.RN2));
  if (leftCount >= 0) {
    leftQuiz.questionAndAnswerList[
      leftCount
    ] = `${leftQuiz.RN1} ${leftQuiz.RO} ${leftQuiz.RN2} = ${answer}`;

    leftQuiz.userAnswerList[
      leftCount
    ] = `${leftQuiz.RN1} ${leftQuiz.RO} ${leftQuiz.RN2} = ${input}`;
  }
};

let rightCount = 0;

const rightQuizStart = () => {
  console.log("right Started");
  rightCount++;

  if (rightCount > 0) {
    if (rightCount < 10) {
      document.getElementById("right-button").innerText = "Next Question";
    } else {
      document.getElementById("right-button").innerText = "Finish Quiz";
    }

    let input = document.getElementById("right-input").value;
    //   console.log(input);
    rightQuiz.RN1 = rightQuiz.getRandomNumber();
    rightQuiz.RN2 = rightQuiz.getRandomNumber();
    rightQuiz.RO = rightQuiz.getRandomOperator();
    rightQuiz.updateDOM("right");

    let answer = Math.floor(
      calculate[rightQuiz.RO](rightQuiz.RN1, rightQuiz.RN2)
    );

    rightQuiz.userAnswerList[
      rightCount
    ] = `${rightQuiz.RN1} ${rightQuiz.RO} ${rightQuiz.RN2} = ${input}`;
    rightQuiz.questionAndAnswerList[
      rightCount
    ] = `${rightQuiz.RN1} ${rightQuiz.RO} ${rightQuiz.RN2} = ${answer}`;
  }
};

leftQuiz.button.addEventListener("click", () => {
  leftCount < 11 ? leftQuizStart() : leftQuiz.printResults();
});

rightQuiz.button.addEventListener("click", () => {
  rightCount < 11 ? rightQuizStart() : rightQuiz.printResults();
});
