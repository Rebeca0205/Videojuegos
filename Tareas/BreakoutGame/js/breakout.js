"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 0.5;
let lives = 3;

// Context of the Canvas
let ctx;

class Ball extends GameObject{
    constructor(position, width, height, color){
        super(position, width, height, color, "ball");
        this.initVelocity();
    }

    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity(){
        this.inPlay = true;
        let angle = Math.random() * (Math.PI / 2) - (Math.PI / 4);
        this.velocity = new Vec(Math.sin(angle) * 0.2, Math.cos(angle)*0.2);
    }

    reset(){
        this.inPlay = false;
        this.position = new Vec(canvasWidth/2, canvasHeight/2 + 100);
        this.velocity = new Vec(0,0);
    }
}

class Paddle extends GameObject{
    constructor(position, width, height, color){
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if(this.position.x < 0){
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth){
            this.position.x = canvasWidth - this.width;
        }
    }
}

class ExtraLive extends GameObject {
    constructor(position) {
        super(position, 20, 20, "green", "extralive");
        this.velocity = new Vec(0, 0.1);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

const box = new Ball(new Vec(canvasWidth / 2, canvasHeight/2 +100), 10, 10, "white");
const mainPaddle = new Paddle(new Vec(canvasWidth/2 -30,canvasHeight - 50), 80, 20, "white");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 1), canvasWidth, 1, "black", "obstacle");
const topBar = new GameObject(new Vec(0,45), canvasWidth, 1, "black", "obstacle");
const letfBar = new GameObject(new Vec(0, 0), 1, canvasHeight, "black", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth - 1,0), 1, canvasHeight, "black", "obstacle");
const livesLabel = new TextLabel(20, 35, "30px Arial", "white");
const DestroyesBlocksLabel = new TextLabel(150, 35, "30px Arial", "white");
const gameOverLabel = new TextLabel(170, canvasHeight/2 +200, "30px Arial", "black");
const winLabel = new TextLabel(170, canvasHeight/2 +150, "30px Arial", "black");

let extralives = [];

let colors = ["red", "yellow", "blue"];
let filas = 8, columnas = 8, blockWidth = 75, blockHeight = 20, gap = 20;
let blocks = [];
let destroyedBlocks = 0;

function doBlocks(){
    blocks = [];
    for (let i = 0; i < filas; i++){
        for(let j = 0; j < columnas; j++){
            let x = j * (blockWidth + gap) + 20;
            let y = i * (blockHeight + gap) + 50;
            blocks.push(new GameObject(new Vec(x, y), blockWidth, blockHeight, colors[j % colors.length], "block"));
        }
    }
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    doBlocks();

    drawScene(0);

    box.reset();
}

function createEventListeners(){
    window.addEventListener('keydown', (event)=> {
        if (event.key == 'a' || event.code == 'ArrowLeft'){
            mainPaddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 'd' || event.code == 'ArrowRight'){
            mainPaddle.velocity = new Vec(paddleVelocity, 0);
        }
    });

    window.addEventListener('keyup', (event)=> {
        if (event.key == 'a' || event.code == 'ArrowLeft'){
            mainPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'd' || event.code == 'ArrowRight'){
            mainPaddle.velocity = new Vec(0, 0);
        }

        if(event.key == 's' && !box.inPlay){
            box.initVelocity();
            gameOverLabel.color = "black";
            winLabel.color = "black";
        }
    });
}

function drawScene(newTime) {
    if(oldTime == undefined){
        oldTime = newTime;
    }

    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    livesLabel.draw(ctx, "Lives: "+ `${lives}`);
    DestroyesBlocksLabel.draw(ctx, "Destroyed Blocks: "+ `${destroyedBlocks}`);
    gameOverLabel.draw(ctx, "Game Over, press 's' to play again");
    winLabel.draw(ctx, "You won! Press 's' to play again");
    box.draw(ctx);
    mainPaddle.draw(ctx);
    extralives.forEach(extralives => {
        extralives.draw(ctx);
        extralives.update(deltaTime);
    });

    bottomBar.draw(ctx);
    topBar.draw(ctx);
    letfBar.draw(ctx);
    rightBar.draw(ctx);
    blocks.forEach(block => block.draw(ctx));

    // Update the properties of the object
    box.update(deltaTime);
    mainPaddle.update(deltaTime);

    if (boxOverlap(box, mainPaddle)){
        box.velocity.y *= -1;
        if (box.position.x < mainPaddle.position.x + mainPaddle.width / 2) {
            box.velocity.x = -Math.abs(box.velocity.x);
        } else {
            box.velocity.x = Math.abs(box.velocity.x);
        }
        box.velocity = box.velocity.times(1.1);
    }
    if (boxOverlap(box, letfBar) || boxOverlap(box, rightBar)){
        box.velocity.x *= -1;
    }
    if (boxOverlap(box, topBar)){
        box.velocity.y *= -1;
    }
    if (boxOverlap(box, bottomBar)){
        lives -= 1;
        box.reset();
        if (lives == 0) {
            lives = 3;
            destroyedBlocks = 0;
            doBlocks();
            gameOverLabel.color = "white";
        }
    }

    blocks = blocks.filter(block => { //Crea una copia de la lista de bloques
        if (boxOverlap(box, block)) {
            box.velocity.y *= -1;
            
            if (box.position.x < block.position.x + block.width / 2) {
                box.velocity.x = -Math.abs(box.velocity.x);
            } else {
                box.velocity.x = Math.abs(box.velocity.x);
            }

            destroyedBlocks += 1;

            // 10% de probabilidad de generar una vida extra
            if (Math.random() < 0.1) {
                extralives.push(new ExtraLive(new Vec(block.position.x + blockWidth / 2, block.position.y)));
            }

            return false; // Elimina el bloque
        }
        return true; // Mantiene el bloque en la lista
    });

    extralives = extralives.filter(extralives => {
        if (boxOverlap(extralives, mainPaddle)) {
            lives += 1; // Sumar una vida extra
            return false; // Elimina el power-up
        }
        return extralives.position.y < canvasHeight; // Elimina si toca el suelo
    });

    if(destroyedBlocks == 64){
        winLabel.color = "white";
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
