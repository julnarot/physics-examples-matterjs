'use strict';

function refresh() {
    location.reload();
}

// https://brm.io/matter-js/docs/classes/Bodies.html


function startSimulation() {

    // Matter.Engine
    const engine = Matter.Engine.create();
    // engine.world.gravity.y = 9.8;
    // Matter.Render
    const renderer = Matter.Render.create({
        engine: engine,
        canvas: document.getElementById("scene"),
        options: {
            width: 800,
            height: 600,
            wireframes: false
        }
    });
    const Bodies = Matter.Bodies, Body = Matter.Body;

    // The Bodies
    const bigBox = Bodies.rectangle(300, 474, 150, 150, {
        inertia: Infinity,
        frictionAir: 0,
        friction: getValueElementById('ofriction')
    });




    // The Walls
    const floor = Bodies.rectangle(400, 590, 800, 77, {
        isStatic: true
    });
    const ceiling = Bodies.rectangle(400, 10, 800, 77, {
        isStatic: true
    });
    const wallL = Bodies.rectangle(10, 300, 77, 600, {
        isStatic: true
    });
    const wallR = Bodies.rectangle(790, 300, 77, 600, {
        isStatic: true
    });


    // Matter.World
    Matter.World.add(engine.world, floor);
    Matter.World.add(engine.world, ceiling);
    Matter.World.add(engine.world, wallL);
    Matter.World.add(engine.world, wallR);

    Matter.World.add(engine.world, bigBox);

    Matter.Engine.run(engine);
    Matter.Render.run(renderer);


    document.getElementById('the-box').addEventListener('click', function () {
        Body.setMass(bigBox, getValueElementById('omass'));
        bigBox.friction =  getValueElementById('ofriction');

        const speed = getValueElementById('pvelocity'); // 0.02
        const angle = 0;
        const ball = Bodies.circle(100, 500, 5, {
            friction: 0,
            frictionAir: 0,
            restitution: 0.2
        });
        Body.setMass(ball, getValueElementById('pmass')); // 0.1
        Matter.World.add(engine.world, ball)
        let vector = Matter.Vector.create(Math.cos(angle) * speed, Math.sin(angle) * speed);
        Body.applyForce(ball, ball.position, vector);
        setTimeout(() => {
            Matter.World.remove(engine.world, ball);
        }, 1500);
    });

    function getValueElementById(id) {
        return Number(document.getElementById(id).value);
    }
}


