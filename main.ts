/** screen size:width */
const WIDTH:number = 640;
/** screen size:height */
const HEIGHT:number = 360;

/** canvas */
const CANVAS = document.getElementById('screen') as HTMLCanvasElement;

/** Context */
const CTX = CANVAS.getContext('2d');

const draw = (): void => {
  if(! CTX) return;
  CTX.fillStyle = 'gray';
  CTX.fillRect(0, 0, WIDTH, HEIGHT);
}

window.onload = (): void => {
  if(! CTX) {
    console.error("2D context is not supported in this browser.");
    return;
  }

  requestAnimationFrame(draw);
};
