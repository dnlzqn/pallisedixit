let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner;

let engine, world, ground, leftWall, rightWall, generateButton;
let messageBodies = [];
let displayedMessages = new Set();
const messages = [
    "Tot ajuda a viure.", "A tothom o a totdon?", "El tiempo es oro y la bicicleta un tesoro.",
    "La noblesa ja no és el que era.", "A casa hi falta gent.", "Em ve una mica de repel.",
    "A la salud del ojo meneado.", "Aquí comença i aquí acaba.", "Un cigarret de paper que no fa ni mal ni bé.",
    "Reunión de pastores, oveja muerta.", "Aquell paio no sabia ni fer un ou caragolat.",
    "Costa molt veure-hi pel clatell.", "Al enemigo que huye, puente de plata.",
    "Quita, quita, que todavía no está puesto el olivar.", "Per lo cap o per la pota, tot explota.",
    "Tothom parla de la fira segons li ha anat.", "El miedo es libre, todo el mundo coge el que quiere.",
    "No es nada lo del ojo y lo llevaba en la mano.", "Casa con dos puertas mala es de guardar.",
    "A quien Dios no le da hijos, el diablo le da sobrinos.", "No comer por haber comido, no hay nada perdido.",
    "Després de baixar pel parking del Prim, vaig estar una setmana sense cagar.",
    "Hi han ulls que s’enamoren de lleganyes.", "Pan con pan comida de tontos y más tonto es el que no come porque solo tiene pan.",
    "El tiempo es oro y la bicicleta un tesoro.", "No es pot ser vell ni cobrant.", "Aquí comença i aquí acaba.",
    "No comer por haber comido, no hay nada perdido.", "Para los milagros tardo más", "Si quieres puedes escribir en castellano los números, no hay problema.",
    "Mañana te lo diré.", "El geperut no es veu el gep.", "No hi ha res que s'esperi més que la feina.",
    "El llegir et farà perdre l'escriure.", "Qui va amb un coix al cap d'una any s'hi torna.",
    "Jo estava histèric, a mi em votava l'ull.", "N'hi ha un que puja.", "La cervesa que refresca i la menta que calenta.",
    "Macagun el cap de vall.", "Donar al que té més que tu és robar.", "Els justos van al cel.",
    "Pues si es moda... aunque me ahogue.", "Jo només, per no seguir la discussió, ja et dic que sí.",
    "Secretos en conversación es de mala educación.", "Al juliol, ni dona ni cargol.",
    "Confía en dios y no corras.", "Tu i jo hem menjat mai del mateix plat?", "Saps com li diuen a un gos com aquest? Un llepaconys.",
    "Per treballar s'ha de córrer, per menjar no.", "A lo imposible ningú hi està obligat.",
    "Qui no té un all, té una ceba.", "Haz lo que digo yo, pero no lo que yo hago.",
    "Yo no voy, que me llevan...", "Hombre muerto, ¿quien te ha muerto?", "Póngame a los pies de su esposa.",
    "La moda no incomoda.", "Qui no té un all, té una ceba.", "Ha optat per dormir a la nit.",
    "A la boca se li fa dir el que es vol.", "Quatre guineus i una llebre es reuneixen per votar què soparan.",
    "Tanta roba i tan poc sabó... i tan neta que la volen.", "Jo sabia que tenia gos, però un home no."
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

    let wallOptions = { isStatic: true };
    leftWall = Bodies.rectangle(0, height / 2, 10, height, wallOptions);
    rightWall = Bodies.rectangle(width, height / 2, 10, height, wallOptions);
    ground = Bodies.rectangle(width / 2, height, width, 10, wallOptions);
    World.add(world, [leftWall, rightWall, ground]);

    generateButton = select('#generate-button');
    generateButton.mousePressed(generateMessage);

    let runner = Runner.create();
    Runner.run(runner, engine);

    generateMessage();
}

function generateMessage() {
    if (displayedMessages.size === messages.length) {
        generateButton.remove();
        return;
    }

    let randomIndex;
    do {
        randomIndex = floor(random(messages.length));
    } while (displayedMessages.has(randomIndex));

    displayedMessages.add(randomIndex);

    let message = messages[randomIndex];
    textSize(20);
    let padding = 20;
    let textWidthValue = textWidth(message) + padding * 2;
    let textHeight = 30;
    let body = Bodies.rectangle(random(width), 0, textWidthValue, textHeight, {
        angle: random(-PI / 8, PI / 8),
        restitution: 0.5
    });

    messageBodies.push({ body, text: message, width: textWidthValue, height: textHeight });
    World.add(world, body);
}

function draw() {
    background(240);

    fill(0);
    textAlign(LEFT, TOP);
    textSize(32);
    text("Pallisé dixit és una aplicació web que recull un bon grapat de dites populars pronunciades per un gentleman, arquitecte i professor montbanquí anomenat Antoni Pallisé.", 10, 10, windowWidth - 20);

    textSize(16);
    for (let messageBody of messageBodies) {
        let { position: pos, angle } = messageBody.body;

        // Reposicionar mensajes que están fuera de los nuevos límites
        if (pos.x < 0 || pos.x > width || pos.y > height) {
            Body.setPosition(messageBody.body, { x: random(width), y: 0 });
            Body.setVelocity(messageBody.body, { x: 0, y: 0 });
        }

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(0, 0, messageBody.width, messageBody.height);
        fill(0);
        textAlign(CENTER, CENTER);
        text(messageBody.text, 0, 0);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateWallsAndGround();
}

function updateWallsAndGround() {
    let wallVertices = (x, y, w, h) => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
    
    Body.setPosition(leftWall, { x: 0, y: height / 2 });
    Body.setVertices(leftWall, wallVertices(0, 0, 10, height));

    Body.setPosition(rightWall, { x: width, y: height / 2 });
    Body.setVertices(rightWall, wallVertices(width - 10, 0, 10, height));

    Body.setPosition(ground, { x: width / 2, y: height });
    Body.setVertices(ground, wallVertices(0, height - 10, width, 10));
}
