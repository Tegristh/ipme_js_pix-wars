const colorsList: string[] = [
    "#FF0000", "#00FF00", "#0000FF", "#000", "#FFF",
    "#FF0000", "#00FF00", "#0000FF", "#000", "#FFF"
]
let currentColorChoice: string = colorsList[2]

const colorsChoice = document.getElementById('colorsChoice')!
const cursor = document.getElementById('cursor')!
const gridCellSize = 10

colorsList.forEach(color =>{
    const colorItem = document.createElement('div');
    colorItem.style.backgroundColor = color;
    colorsChoice.appendChild(colorItem)

    colorItem.addEventListener('click', () => {
        currentColorChoice = color
        colorItem.innerHTML = `<i class="fa-solid fa-check"></i>`
        setTimeout(() => {
            colorItem.innerHTML = ""
        }, 1000)
    } )
})

const game = document.getElementById('game') as HTMLCanvasElement
game.width = 800
game.height = 600

const ctx: CanvasRenderingContext2D = game.getContext('2d')!
const gridctx: CanvasRenderingContext2D = game.getContext('2d')!

function addPixel(){
    const x : number = cursor.offsetLeft - game.offsetLeft
    const y : number = cursor.offsetTop - game.offsetTop
    ctx.beginPath()
    ctx.fillStyle = currentColorChoice
    ctx.fillRect(x, y, gridCellSize, gridCellSize)
}


cursor.addEventListener('click', function(event){
    addPixel()
})
game.addEventListener('click', function(event){
    addPixel()
})

function drawGrids(ctx, width, height, cellWidth, cellHeight){
    ctx.beginPath()
    ctx.strokeStyle = "#CCC"

    for(let i = 0; i < width; i++){
        ctx.moveTo(i * cellWidth, 0)
        ctx.lineTo(i * cellWidth, height)
    }
    for(let i = 0; i < height; i++){
        ctx.moveTo(0, i * cellHeight)
        ctx.lineTo(width, i * cellHeight)
    }
    ctx.stroke()
}
drawGrids(gridctx, game.width, game.height, gridCellSize, gridCellSize)

game.addEventListener('mousemove', function(event){
    // console.log("x :", event.clientX)
    // console.log("Y :", event.clientY)

    const cursorLeft = event.clientX - (cursor.offsetWidth /2)
    const cursorTop = event.clientY - (cursor.offsetHeight /2)

    cursor.style.left = Math.floor(cursorLeft/ gridCellSize) * gridCellSize + 1 +"px"
    cursor.style.top = Math.floor(cursorTop/ gridCellSize) * gridCellSize - 2 +"px"
})