"use strict";
/** screen size:width */
const WIDTH = 640;
/** screen size:height */
const HEIGHT = 360;
/** canvas */
const CANVAS = document.getElementById('screen');
/** Context */
const CTX = CANVAS.getContext('2d');
const draw = () => {
    if (!CTX)
        return;
    CTX.fillStyle = 'gray';
    CTX.fillRect(0, 0, WIDTH, HEIGHT);
};
window.onload = () => {
    if (!CTX) {
        console.error("2D context is not supported in this browser.");
        return;
    }
    requestAnimationFrame(draw);
};
