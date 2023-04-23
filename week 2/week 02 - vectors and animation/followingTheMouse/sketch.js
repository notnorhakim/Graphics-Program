//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = [];
///////////////////////////////////////////////
function setup() {
  createCanvas(900,600);

  for (var i = 0; i < 100; i++) {
    balls[i] = new Ball();
  }
  background(0);
}
////////////////////////////////////////////////
function draw() {
  background(0, 0.1);
  for (var i = 0; i < balls.length; i++) {
    balls[i].run();
  }
}
///////////////////////////////////////////////
class Ball {

  constructor(){
    var randomX = width/2+random(-100,100);
    var randomY = height/2+random(-100,100);

    this.prevLocation = new createVector(randomX, randomY);
    this.velocity = new createVector(0, 0);
    this.location = new createVector(randomX, randomY);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 50;

  }

  run(){
    this.draw();
    this.move();
  }

  draw(){
    strokeWeight(0.5);
    
    stroke(255, random(255), random(255));
    line (this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.prevLocation = this.location.copy();
  }

  move(){
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.3);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }

  
}
