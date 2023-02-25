/** screen size:width */
var WIDTH = 640;
/** screen size:height */
var HEIGHT = 360;
/** CANVAS */
var CANVAS = document.getElementById('screen');
/** CONTEXT */
var CTX = CANVAS.getContext('2d');
/**
 * Get timestamp
 * @return number Date().getTime()
 */
var timestamp = function () {
    return new Date().getTime();
};
/** キー状態を保持 */
var keys = {};
/** timestamp:before */
var before_timestamp = timestamp();
/** draw time:before */
var before_draw_time = 1000;
/** FPS */
var fps = 1;
/** 現在押されているキーリスト */
var currentKeys = [];
/** キーを押す */
var onKeyDown = function (event) {
    keys[event.key] = true;
    currentKeys.push(event.code);
};
/** キーを離す */
var onKeyUp = function (event) {
    keys[event.key] = false;
    var index = currentKeys.indexOf(event.code);
    if (index !== -1) {
        currentKeys.splice(index, 1);
    }
};
// イベントリスナーの登録
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
/**
 * Draw
 * @returns void
 */
var draw = function () {
    if (!CTX)
        return;
    // Background
    CTX.fillStyle = '#222';
    CTX.fillRect(0, 0, WIDTH, HEIGHT);
    // Write FPS & currentKeys Reset
    if (Math.floor(before_timestamp / 1000) < Math.floor(timestamp() / 1000)) {
        fps = 1000 / before_draw_time;
        currentKeys.length = 0;
    }
    CTX.font = '10pt Arial';
    CTX.fillStyle = '#ccc';
    CTX.fillText("FPS: ".concat(fps.toFixed(2)), 20, 20);
    CTX.fillText("Pressed keys: ".concat(currentKeys.join(", ")), 20, 32);
    CTX.fillText("CONFIG MESSAGE: ".concat(CONFIG.MESSAGE), 20, 44);
    // Prepare for next
    before_draw_time = timestamp() - before_timestamp;
    before_timestamp = timestamp();
    requestAnimationFrame(draw);
};
window.onload = function () {
    if (!CTX) {
        console.error("2D context is not supported in this browser.");
        return;
    }
    requestAnimationFrame(draw);
};
