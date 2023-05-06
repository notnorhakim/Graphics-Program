//////////////////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////////////////////
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
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;

var engine;
var ground;
var constraint1;
var polyA;
var polyB;

var canvas;

var polyC;
var constraint2;
///////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(800, 600);

  // create an engine
  engine = Engine.create();

  polyA = Bodies.polygon(400, 100, 6, 20);
  polyB = Bodies.polygon(400, 350, 6, 50);
  constraint1 = Constraint.create
  ({

      bodyA: polyA,
      pointA: { x: 0, y: 0 },
      bodyB: polyB,
      pointB: { x: -10, y: -10 },
      stiffness: 0.001
  });
  World.add(engine.world, [polyA, polyB, constraint1]);


  // create two boxes and a ground
  ground = Bodies.rectangle(width/2, height-20, 800, 10, {isStatic: true, angle: 0});
  // add all of the bodies to the world
  World.add(engine.world, [ground]);

  polyC = Bodies.polygon(300, 200, 5, 40);
  constraint2 = Constraint.create
  ({
      pointA: { x: 150, y: 50 },
      bodyB: polyC,
      pointB: { x: 0, y: 0 },
  });
  World.add(engine.world, [polyC, constraint2]);

  // add mouse control
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
  };
  var mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, [mouseConstraint]);

}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);

  fill(128);
  drawVertices(ground.vertices);
  drawVertices(polyA.vertices);
  drawVertices(polyB.vertices);
  drawVertices(polyC.vertices);

  stroke(255,0,0);
  drawConstraint(constraint1);
  drawConstraint(constraint2);
}
///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
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
