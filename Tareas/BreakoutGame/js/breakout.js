"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 0.5;

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
        if(this.position.y < 0){
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight){
            this.position.y = canvasHeight - this.height;
        }
    }
}

const box = new Ball(new Vec(canvasWidth / 2, canvasHeight/2 +100), 10, 10, "white");
const mainPaddle = new Paddle(new Vec(canvasWidth/2 -30,canvasHeight - 80), 120, 20, "white");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 1), canvasWidth, 1, "black", "obstacle");
const topBar = new GameObject(new Vec(0,0), canvasWidth, 1, "black", "obstacle");
const letfBar = new GameObject(new Vec(0, 0), 1, canvasHeight, "black", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth - 1,0), 1, canvasHeight, "black", "obstacle");

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    drawScene(0);
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
    box.draw(ctx);
    mainPaddle.draw(ctx);
    bottomBar.draw(ctx);
    topBar.draw(ctx);
    letfBar.draw(ctx);
    rightBar.draw(ctx);

    // Update the properties of the object
    box.update(deltaTime);
    mainPaddle.update(deltaTime);

    if (boxOverlap(box, mainPaddle)){
        box.velocity.y *= -1;
        box.velocity = box.velocity.times(1.1);
    }
    if (boxOverlap(box, letfBar) || boxOverlap(box, rightBar)){
        box.velocity.x *= -1;
        box.velocity = box.velocity.times(1.1);
    }
    if (boxOverlap(box, topBar)){
        box.velocity.y *= -1;
    }
    if (boxOverlap(box, bottomBar)){
        box.reset();
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
