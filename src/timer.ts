export default class Timer{

  timer: HTMLLabelElement;
  timerInterval: number;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  constructor() {
    this.timer = document.querySelector(".timer")! as HTMLLabelElement;
    this.timerInterval = 0;
  }

  start() {
    console.log("Timer started");
    this.timerInterval = window.setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {

    this.seconds++;

    if (this.seconds == 60) {
      this.seconds = 0;
      this.minutes++;
    }

    if (this.minutes == 60) {
      this.minutes = 0;
      this.hours++;
    }

    let newTime = `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
    this.timer.innerText = newTime;

  }

  stop() {
    console.log("Timer stopped");
    clearInterval(this.timerInterval);
    this.reset();
  }

  reset() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timer.innerText = "00:00:00";
  }


}