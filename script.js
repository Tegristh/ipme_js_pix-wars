"use strict";
const colorsList = [
    "#e71d43", "#ff0000", "#ff3700", "#ff6e00", "#ffa500",
    "#ffc300", "#ffe100", "#ffff00", "#aad500", "#55aa00",
    "#008000", "#005555", "#002baa", "#0000ff", "#1900d5",
    "#3200ac", "#4b0082", "#812ba6", "#b857ca", "#d03a87",
    "#FFF", "#000"
];
let currentColorChoice = colorsList[2];
const colorsChoice = document.getElementById('colorsChoice');
const cursor = document.getElementById('cursor');
const gridCellSize = 10;
colorsList.forEach(color => {
    const colorItem = document.createElement('div');
    colorItem.style.backgroundColor = color;
    colorsChoice.appendChild(colorItem);
    colorItem.addEventListener('click', () => {
        currentColorChoice = color;
        colorItem.innerHTML = `<i class="fa-solid fa-check"></i>`;
        setTimeout(() => {
            colorItem.innerHTML = "";
        }, 1000);
    });
});
const game = document.getElementById('game');
game.width = 800;
game.height = 600;
const ctx = game.getContext('2d');
const gridctx = game.getContext('2d');
function addPixel() {
    const x = cursor.offsetLeft - game.offsetLeft;
    const y = cursor.offsetTop - game.offsetTop;
    ctx.beginPath();
    ctx.fillStyle = currentColorChoice;
    ctx.fillRect(x, y, gridCellSize, gridCellSize);
}
cursor.addEventListener('click', function (event) {
    addPixel();
});
game.addEventListener('click', function (event) {
    addPixel();
});
function drawGrids(ctx, width, height, cellWidth, cellHeight) {
    ctx.beginPath();
    ctx.strokeStyle = "#CCC";
    for (let i = 0; i < width; i++) {
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, height);
    }
    for (let i = 0; i < height; i++) {
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(width, i * cellHeight);
    }
    ctx.stroke();
}
drawGrids(gridctx, game.width, game.height, gridCellSize, gridCellSize);
game.addEventListener('mousemove', function (event) {
    // console.log("x :", event.clientX)
    // console.log("Y :", event.clientY)
    const cursorLeft = event.clientX - (cursor.offsetWidth / 2);
    const cursorTop = event.clientY - (cursor.offsetHeight / 2);
    cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + 1 + "px";
    cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize - 2 + "px";
});
