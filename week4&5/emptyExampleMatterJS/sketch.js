// module aliases   
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Render = Matter.Render;

var engine;
var box1;
var ground;
var boxes = [];







function setup() {

    createCanvas(900, 600);

    // create an engine
    engine = Engine.create();

    box1 = Bodies.rectangle(200, 200, 80, 80, {restitution: 0.8, friction: 0});

    ground1 = Bodies.rectangle(100, 200, 500, 10, {isStatic: true, angle: Math.PI * 0.06});

    ground2 = Bodies.rectangle(400, 500, 810, 10, {isStatic: true, angle: Math.PI * - 0.06});

    //add all of the bodies to the world
    World.add(engine.world, [box1, ground1, ground2]);


}

function draw() {
    background(51);
    Engine.update(engine);

    generateObjects(mouseX, mouseY);
   

    fill(128);
    drawVertices(ground1.vertices);
    drawVertices(ground2.vertices);

    for (var i = 0; i < boxes.length; i++) 
    {
        fill(255);
        drawVertices(boxes[i].vertices);

        if (isOffScreen(boxes[i])) 
        {
            World.remove(engine.world, boxes[i]);
            boxes.splice(i, 1);
            i--;
        }
    }

    // push();
    // fill(255,0,0);
    // var pos = box1.position;
    // translate(pos.x, pos.y);
    // rotate(box1.angle);
    // rectMode(CENTER);
    // rect(0, 0, 80, 80);
    // pop();
    
    // push();
    // rectMode(CENTER);
    // fill(255);
    // var groundPos = ground.position;
    // translate(groundPos.x, groundPos.y);
    // rotate(ground.angle);
    // rect(0, 0, 810, 10);
    // pop();

}

function isOffScreen(body)
{
    var pos = body.position;
    return (pos.y > height + 100 || pos.x < -100 || pos.x > width + 100);
}

function generateObjects (x, y)
{
    var b = Bodies.rectangle(x, y, random(10,30), random(10,30), {restitution: 0.8, friction: 0});
    boxes.push(b);
    World.add(engine.world, [b]);
}

function drawVertices(vertices) 
{
    beginShape();
    for (var i = 0; i < vertices.length; i++) 
    {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
