var colorsList = [
    "#FF0000", "#00FF00", "#0000FF", "#000", "#FFF",
    "#FF0000", "#00FF00", "#0000FF", "#000", "#FFF"
];
var currentColorChoice = colorsList[2];
var colorsChoice = document.getElementById('colorsChoice');
var cursor = document.getElementById('cursor');
var gridCellSize = 10;
colorsList.forEach(function (color) {
    var colorItem = document.createElement('div');
    colorItem.style.backgroundColor = color;
    colorsChoice.appendChild(colorItem);
    colorItem.addEventListener('click', function () {
        currentColorChoice = color;
        colorItem.innerHTML = "<i class=\"fa-solid fa-check\"></i>";
        setTimeout(function () {
            colorItem.innerHTML = "";
        }, 1000);
    });
});
var game = document.getElementById('game');
game.width = 800;
game.height = 600;
var ctx = game.getContext('2d');
var gridctx = game.getContext('2d');
function addPixel() {
    var x = cursor.offsetLeft - game.offsetLeft;
    var y = cursor.offsetTop - game.offsetTop;
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
    for (var i = 0; i < width; i++) {
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, height);
    }
    for (var i = 0; i < height; i++) {
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(width, i * cellHeight);
    }
    ctx.stroke();
}
drawGrids(gridctx, game.width, game.height, gridCellSize, gridCellSize);
game.addEventListener('mousemove', function (event) {
    // console.log("x :", event.clientX)
    // console.log("Y :", event.clientY)
    var cursorLeft = event.clientX - (cursor.offsetWidth / 2);
    var cursorTop = event.clientY - (cursor.offsetHeight / 2);
    cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + 1 + "px";
    cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize - 2 + "px";
});
