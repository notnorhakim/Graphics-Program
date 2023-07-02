/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////

function setup() {
    createCanvas(500,500);
    background(0);
}
/////////////////////////////////////////////////////
function draw() {
   stroke(255);
   fill(random(0,255),random(0,255),random(0,255));

   translate(width/2, height/2);

   var x = cos(radians(frameCount)) * frameCount/20;
   var y = sin(radians(frameCount)) * frameCount/20;

    ellipse(x, y, 5, 5);

}
