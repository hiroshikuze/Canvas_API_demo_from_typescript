"use strict";
/** screen size:width */
const WIDTH = 640;
/** screen size:height */
const HEIGHT = 360;
/** CANVAS */
const CANVAS = document.getElementById('screen');
/** CONTEXT */
const CTX = CANVAS.getContext('2d');
/**
 * Get timestamp
 * @return number Date().getTime()
 */
const timestamp = () => {
    return new Date().getTime();
};
/** timestamp:before */
let before_timestamp = timestamp();
/** draw time:before */
let before_draw_time = 1000;
/** FPS */
let fps = 1;
/**
 * Draw
 * @returns void
 */
const draw = () => {
    if (!CTX)
        return;
    // Background
    CTX.fillStyle = '#222';
    CTX.fillRect(0, 0, WIDTH, HEIGHT);
    // Write FPS
    if (Math.floor(before_timestamp / 1000) < Math.floor(timestamp() / 1000)) {
        fps = 1000 / before_draw_time;
        console.log(before_draw_time);
    }
    CTX.font = '10pt Arial';
    CTX.fillStyle = '#ccc';
    CTX.fillText(`FPS ${fps.toFixed(2)}`, 20, 20);
    // Prepare for next
    before_draw_time = timestamp() - before_timestamp;
    before_timestamp = timestamp();
    requestAnimationFrame(draw);
};
window.onload = () => {
    if (!CTX) {
        console.error("2D context is not supported in this browser.");
        return;
    }
    requestAnimationFrame(draw);
};
