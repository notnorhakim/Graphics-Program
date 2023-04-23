var secLength = 160;
var secWidth = 1;
var minLength = 140;
var minWidth = 3;
var hourLength = 90;
var hourWidth = 5;






function setup() {
    createCanvas(900, 600);
    background(0);
}

function draw() {
    background(255);
    translate (width/2, height/2);
    ellipse(0, 0, 350, 350);
   
    //seconds
    push ();
    strokeWeight(secWidth);
    stroke(200,0,0);
    var secAngle = map (second(), 0, 60, 0, 360);
    rotate (radians(secAngle));
    line (0, 0, 0,-secLength);
    pop ();

    // //minutes
    // push ();
    // strokeWeight(minWidth);
    // stroke(0,200,0);
    // var minAngle = map (minute(), 0, 60, 0, 360);
    // rotate (radians(minAngle));
    // line (0, 0, 0, -minLength);
    // pop (); 

    // //hours
    // push ();
    // strokeWeight(hourWidth);
    // stroke(0,0,200);
    // var hourAngle = map (hour(), 0, 12, 0, 360);
    // rotate (radians(hourAngle));
    // line (0, 0, 0, -hourLength);

    // push ();
    // translate (0, -hourLength);
    // fill ("blue");
    // ellipse(0, 0, 10, 20);
    // pop();

    // pop ();

    var hours = 12;
    var angle = 360 / hours;
    for (var i = 0; i < hours; i++) {
        push();
        rotate(radians(angle * i));
        translate(0, -150);
        fill(0);
        text(i, 0, 0);
        pop();
    }

}
