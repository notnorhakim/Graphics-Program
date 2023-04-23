var ball; 




function setup() {
    createCanvas(900, 600);
    background(0);
    ball = new Ball();
}

function draw() {
    
    ball.run();
   
}

class Ball 
{
    constructor()
    {
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.prevLocation = new createVector(width/2, height/2);
        this.accaleration = new createVector(0, 0);
        this.maxVelocity = 1000;
        
    }

    run()
    {
        this.draw();
        this.move();
        this.bounce();
    }

    draw() 
    {
        stroke (255);
        fill (0, 0, 0);
        // ellipse(this.location.x, this.location.y, 40, 40);
        line (this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
        this.prevLocation = this.location.copy();
    }

    move()
    {
        var mouse = new createVector(mouseX, mouseY);
        var dir = p5.Vector.sub(mouse, this.location);
        dir.normalize();
        dir.mult(0.5);
        this.accaleration = dir;



        this.velocity.add(this.accaleration);
        this.velocity.limit(this.maxVelocity);
        this.location.add(this.velocity);

    }

    bounce()
    {
        if (this.location.x > width || this.location.x < 0) this.velocity.x *= -1;
        
        if (this.location.y > height || this.location.y < 0) this.velocity.y *= -1;
      
    }
}
