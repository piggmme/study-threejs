export class KeyController {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      console.log(e.code + " down");
      this.keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
      console.log(e.code + " up");
      delete this.keys[e.code];
    });
  }
}
