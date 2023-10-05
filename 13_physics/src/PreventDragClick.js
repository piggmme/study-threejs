export class PreventDragClick {
  constructor(canvas) {
    // 드래그 클릭 방지
    this.mouseMoved = false;
    let clickStartX;
    let clickStartY;
    let clickStartTime;

    canvas.addEventListener("mousedown", (e) => {
      this.mouseMoved = false;
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();
    });
    canvas.addEventListener("mouseup", (e) => {
      const xGap = Math.abs(clickStartX - e.clientX); // x축 이동 거리
      const yGap = Math.abs(clickStartY - e.clientY); // y축 이동 거리
      const timeGap = Date.now() - clickStartTime;

      if (xGap > 5 || yGap > 5 || timeGap > 500) {
        // 이동 거리가 5px 초과면 드래그로 판단
        // 클릭이 0.5초 이상이면 드래그로 판단
        this.mouseMoved = true;
      } else {
        this.mouseMoved = false;
      }
    });
  }
}
