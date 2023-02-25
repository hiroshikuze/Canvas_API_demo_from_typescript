/** screen size:width */
const WIDTH:number = 640;
/** screen size:height */
const HEIGHT:number = 360;

/** CANVAS */
const CANVAS = document.getElementById('screen') as HTMLCanvasElement;

/** CONTEXT */
const CTX = CANVAS.getContext('2d');

/**
 * Get timestamp
 * @return number Date().getTime()
 */
const timestamp = (): number => {
  return new Date().getTime();
}

/** キー状態を保持 */
const keys: {[key: string]: boolean} = {};

/** timestamp:before */
let before_timestamp = timestamp();

/** draw time:before */
let before_draw_time = 1000;

/** FPS */
let fps = 1;

/** 現在押されているキーリスト */
const currentKeys: string[] = [];

/** 設定:システム */
declare const CONFIG: {
  /** メッセージ */
  MESSAGE: string;
};

/** 設定:プレイヤー */
declare const PLAYER: {
  /** 移動速度 */
  SPEED: number;
};

/** キーを押す */
const onKeyDown = (event: KeyboardEvent): void => {
  keys[event.key] = true;
  currentKeys.push(event.code);
}

/** キーを離す */
const onKeyUp = (event: KeyboardEvent): void => {
  keys[event.key] = false;
  const index = currentKeys.indexOf(event.code);
  if(index !== -1) {
    currentKeys.splice(index, 1)
  }
}

// イベントリスナーの登録
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

/**
 * Draw
 * @returns void
 */
const draw = (): void => {
  if(! CTX) return;

  // Background
  CTX.fillStyle = '#222';
  CTX.fillRect(0, 0, WIDTH, HEIGHT);

  // Write FPS & currentKeys Reset
  if(Math.floor(before_timestamp / 1000) < Math.floor(timestamp() / 1000)) {
    fps = 1000 / before_draw_time;
    currentKeys.length = 0;
  }
  CTX.font = '10pt Arial';
  CTX.fillStyle = '#ccc';
  CTX.fillText(`FPS: ${fps.toFixed(2)}`, 20, 20);
  CTX.fillText(`Pressed keys: ${currentKeys.join(", ")}`, 20, 32);
  CTX.fillText(`CONFIG MESSAGE: ${CONFIG.MESSAGE}`, 20, 44);

  // Prepare for next
  before_draw_time = timestamp() - before_timestamp;
  before_timestamp = timestamp();

  requestAnimationFrame(draw);
}

window.onload = (): void => {
  if(! CTX) {
    console.error("2D context is not supported in this browser.");
    return;
  }

  requestAnimationFrame(draw);
};