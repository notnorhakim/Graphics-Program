//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license by Daniel Shiffman
var balls = [];
////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
}
////////////////////////////////////////////////////
function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) 
  {
    var gravity = createVector(0, 0.1);
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run();
  }

  //draw a square at the center of the screen
  fill(255,10,10,100);
  rectMode(CENTER);
  rect(width/2, height/2, 100, 100);



  
}

function mouseDragged()
{ 
 

  balls.push(new Ball(mouseX, mouseY, 255));
}



//////////////////////////////////////////////////////
class Ball {
  

  constructor(x,y,color){
    //make a random number between -3 and 3 for the x and y velocity components 


    this.color = color;
    this.velocity = new createVector(Math.floor(Math.random() * (3 - (-3) + 1)) + (-3),Math.floor(Math.random() * (3 - (-3) + 1)) + (-3));
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size =Math.floor(Math.random() * 31) + 10;
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
    this.checkCollision();

  }

  draw(){

    fill(this.color); 
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  checkCollision()
  {
    //check if the ball is inside the square
    if(this.location.x + this.size/2 > width/2 - 50 && this.location.x + this.size/2 < width/2 + 50 && this.location.y +this.size/2 > height/2 - 50 && this.location.y +this.size/2 < height/2 + 50)
    {
      //if it is, change the color
      this.color = color(255,0,0);
    }
  

  }
  
}
