export class App {
  ui = {};

  constructor() {
    this.setUI();
    this.restartListen(this.ui.resetBtn);
    this.checkListen(this.ui.checkBtn);
    console.log(this.ui);
    console.log(this.feedback);
  }

  setUI() {
    this.ui.resetBtn = document.querySelector(".interactive__reset-btn");
    this.ui.checkBtn = document.querySelector(".interactive__check-btn");
    this.ui.userInput = document.querySelector(".interactive__user-input");

    this.ui.feedbackEl = document.querySelector(".info__feedback");
  }

  feedback(string) {
    let message = "";
    switch (string) {
      case "win":
        message = "Wow, you're right!!";
        break;
      case "lose":
        message = "Sorry, you lost";
        break;
      case "low":
        message = "Too low!";
        break;
      case "high":
        message = "Too high!";
        break;
      case "start":
        message = "Waiting for your first guess...";
        break;
      default:
        message = "There is some error on our side, sorry!";
    }
    this.ui.feedbackEl.textContent = message;
  }

  restartListen(btn) {
    btn.addEventListener("click", () => this.resetGame());
  }

  checkListen(btn) {
    btn.addEventListener("click", () => this.check());
  }

  resetGame() {
    this.feedback("start");
  }

  check() {
    console.log(this.ui.userInput.value);
  }
}
