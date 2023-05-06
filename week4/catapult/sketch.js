// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var engine;
var ground;

var ball1;
var ball2;

var catapult;
var catapultSpacer;
var constraint;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create(); // create an engine
  setupCatapult();
  setupBalls();
  setupGround();
}
/////////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);
  drawBalls();
  drawCatapult();
  drawGround();
}
/////////////////////////////////////////////////////////////
function setupCatapult(){
  // your code here
  catapult = Bodies.rectangle(400, 500, 600, 20);
  catapultSpacer = Bodies.rectangle(110, height-43, 20, 90, {isStatic: true});
  constraint = Constraint.create({
    bodyA: catapult,
    pointB: {x: 400, y: 500},
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [catapult, constraint, catapultSpacer]);
}
/////////////////////////////////////////////////////////////
function drawCatapult(){
  // your code here
  noStroke();
  fill(128);
  drawVertices(catapult.vertices);
  stroke(255,0,0);
  drawConstraint(constraint);
  fill("red");
  drawVertices(catapultSpacer.vertices);
}
/////////////////////////////////////////////////////////////
function setupBalls(){
  // your code here
  //make ball 1 bouncy

  ball1 = Bodies.circle(150, 470, 20, {restitution: 0.5, friction:  0, density: 0.001});
  ball2 = Bodies.circle(600, 100, 60, { friction: 0, density: 0.01});
  World.add(engine.world, [ball1, ball2]);
}
/////////////////////////////////////////////////////////////
function drawBalls(){
  // your code here
  noStroke();
  fill(128);
  drawVertices(ball1.vertices);
  drawVertices(ball2.vertices);

}
/////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(400, height-10, 810, 25, {isStatic: true});
  World.add(engine.world, [ground]);
}
/////////////////////////////////////////////////////////////
function drawGround(){
  noStroke();
  fill(128);
  drawVertices(ground.vertices);
}
////////////////////////////////////////////////////////////////
// ******* HELPER FUNCTIONS *********
// DO NOT WRITE BELOW HERE
/////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function drawConstraint(constraint) {
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}