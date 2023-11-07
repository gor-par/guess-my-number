export class App {
  ui = {};

  get highscore() {
    return localStorage.getItem("highscore")
      ? +localStorage.getItem("highscore")
      : 0;
  }

  set highscore(v) {
    localStorage.setItem("highscore", v);
  }

  get attempts() {
    return this.__attempts;
  }

  set attempts(v) {
    this.__attempts = v;
    this.ui.currentScore.textContent = this.attempts;
  }

  constructor(rules) {
    this.setUI();
    this.rules = rules
      ? rules
      : {
          // default settings
          min: 1,
          max: 20,
          attempts: 10,
        };
    this.resetGame();
  }

  setUI() {
    this.ui.resetBtn = document.querySelector(".interactive__reset-btn");
    this.ui.checkBtn = document.querySelector(".interactive__check-btn");
    this.ui.userInput = document.querySelector(".interactive__user-input");

    this.resetListen(this.ui.resetBtn);
    this.checkListen(this.ui.checkBtn);

    this.ui.feedback = document.querySelector(".info__feedback");
    this.ui.currentScore = document.querySelector(".info__current-score");
    this.ui.highscore = document.querySelector(".info__highscore");

    this.ui.numberDisplay = document.querySelector(".number-display");

    this.ui.body = document.body;
  }

  feedback(string) {
    let message = "";
    switch (string) {
      case "win":
        message = "Wow, you're right!! Wanna try again?";
        break;
      case "lose":
        message = "Sorry, you lost. Wanna try again?";
        break;
      case "low":
        message = "Pick higher!";
        break;
      case "high":
        message = "Pick lower!";
        break;
      case "start":
        message = "Waiting for your first guess...";
        break;
      default:
        message = "There is some error on our side, sorry!";
    }
    this.ui.feedback.textContent = message;
  }

  resetListen(btn) {
    btn.addEventListener("click", () => this.resetGame());
  }

  checkListen(btn) {
    btn.addEventListener("click", () => this.check());
  }

  wonGame() {
    this.feedback("win");
    this.ui.body.className = "won";
    this.updateHighscore();
    this.ui.numberDisplay.textContent = this.target;
  }

  lostGame() {
    this.feedback("lose");
    this.ui.body.className = "lost";
    this.ui.numberDisplay.textContent = this.target;
  }

  resetGame() {
    this.feedback("start");
    this.ui.body.className = "";
    this.target = this.generateNumber();
    console.log(this.target);
    this.attempts = this.rules.attempts;
    this.refreshHighcore();
    this.ui.numberDisplay.textContent = "??";
  }

  check() {
    const guess = +this.ui.userInput.value;

    if (this.attempts < 1) {
      this.lostGame();
    } else if (guess == this.target) {
      this.wonGame();
    } else if (guess < this.target) {
      this.feedback("low");
      this.attempts--;
    } else if (guess > this.target) {
      this.feedback("high");
      this.attempts--;
    }
  }

  updateHighscore() {
    if (this.attempts > this.highscore) {
      this.highscore = this.attempts;
      this.refreshHighcore();
    }
  }

  refreshHighcore() {
    this.ui.highscore.textContent = this.highscore;
  }

  generateNumber() {
    // not sure whether it works for min != 1 or not
    return (
      Math.floor(
        Math.random() * (this.rules.max - this.rules.min + 1) +
          this.rules.min -
          1
      ) + 1
    );
  }
}
