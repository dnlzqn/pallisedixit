let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Runner = Matter.Runner;

let engine;
let world;
let ground;
let leftWall, rightWall; // Paredes laterales
let generateButton;

let messages = [
    "Tot ajuda a viure.",
    "A tothom o a totdon?",
    "El tiempo es oro y la bicicleta un tesoro.",
    "La noblesa ja no és el que era.",
    "A casa hi falta gent.",
    "Em ve una mica de repel.",
    "A la salud del ojo meneado.",
    "Aquí comença i aquí acaba.",
    "Un cigarret de paper que no fa ni mal ni bé.",
    "Reunión de pastores, oveja muerta.",
    "Aquell paio no sabia ni fer un ou caragolat.",
    "Costa molt veure-hi pel clatell.",
    "Al enemigo que huye, puente de plata.",
    "Quita, quita, que todavía no está puesto el olivar.",
    "Per lo cap o per la pota, tot explota.",
    "Tothom parla de la fira segons li ha anat.",
    "El miedo es libre, todo el mundo coge el que quiere.",
    "No es nada lo del ojo y lo llevaba en la mano.",
    "Casa con dos puertas mala es de guardar.",
    "A quien Dios no le da hijos, el diablo le da sobrinos.",
    "No comer por haber comido, no hay nada perdido.",
    "Després de baixar pel parking del Prim, vaig estar una setmana sense cagar.",
    "Hi han ulls que s’enamoren de lleganyes.",
    "Pan con pan comida de tontos y más tonto es el que no come porque solo tiene pan.",
    "El tiempo es oro y la bicicleta un tesoro.",
    "No es pot ser vell ni cobrant.",
    "Aquí comença i aquí acaba.",
    "No comer por haber comido, no hay nada perdido.",
    "Para los milagros tardo más",
    "Si quieres puedes escribir en castellano los números, no hay problema.",
    "Mañana te lo diré.",
    "El geperut no es veu el gep.",
    "No hi ha res que s'esperi més que la feina.",
    "El llegir et farà perdre l'escriure.",
    "Qui va amb un coix al cap d'una any s'hi torna.",
    "Jo estava histèric, a mi em votava l'ull.",
    "N'hi ha un que puja.",
    "La cervesa que refresca i la menta que calenta.",
    "Macagun el cap de vall.",
    "Donar al que té més que tu és robar.",
    "Els justos van al cel.",
    "Pues si es moda... aunque me ahogue.",
    "Jo només, per no seguir la discussió, ja et dic que sí.",
    "Secretos en conversación es de mala educación.",
    "Al juliol, ni dona ni cargol.",
    "Confía en dios y no corras.", 
    "Tu i jo hem menjat mai del mateix plat?",
    "Saps com li diuen a un gos com aquest? Un llepaconys.",
    "Per treballar s'ha de córrer, per menjar no.",
    "A lo imposible ningú hi està obligat.",
    "Qui no té un all, té una ceba.",
    "Haz lo que digo yo, pero no lo que yo hago.",
    "Yo no voy, que me llevan...",
    "Hombre muerto, ¿quien te ha muerto?",
    "Póngame a los pies de su esposa.",
    "La moda no incomoda.",
    "Qui no té un all, té una ceba.",
    "Ha optat per dormir a la nit.",
    "A la boca se li fa dir el que es vol.",
    "Quatre guineus i una llebre es reuneixen per votar què soparan.",
    "Tanta roba i tan poc sabó... i tan neta que la volen.",
    "Jo sabia que tenia gos, però un home no."
];

let remainingMessages = [...messages]; // Copia de la lista original
let messageBodies = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

    // Paredes laterales
    leftWall = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
    rightWall = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });
    World.add(world, [leftWall, rightWall]);

    // Suelo para atrapar los mensajes
    ground = Bodies.rectangle(width / 2, height, width, 10, { isStatic: true });
    World.add(world, ground);

    // Obtener el botón y agregar evento de clic
    generateButton = select('#generate-button');
    generateButton.mousePressed(generateMessage);

    // Usar Runner en lugar de Engine.run
    let runner = Runner.create();
    Runner.run(runner, engine);
}

function generateMessage() {
    if (remainingMessages.length === 0) return;

    let randomIndex = floor(random(remainingMessages.length));
    let randomAngle = random(-PI / 8, PI / 8);
    let message = remainingMessages.splice(randomIndex, 1)[0]; // Elimina el mensaje seleccionado
    
    // Calcular ancho y alto del texto
    textSize(20);
    let textWidthValue = textWidth(message) + 20;
    let textHeight = 30;

    let body = Bodies.rectangle(random(width), 0, textWidthValue, textHeight, {
        angle: randomAngle,
        restitution: 0.5 // Bounciness
    });

    messageBodies.push({ body: body, text: message, width: textWidthValue, height: textHeight });
    World.add(world, body);

    // Ocultar el botón si no hay más mensajes
    if (remainingMessages.length === 0) {
        generateButton.hide();
    }
}

function draw() {
    background(240);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(32);
    let s = "Pallisé dixit és una aplicació web que recull un bon grapat de dites populars pronunciades per un gentleman arquitecte i professor montbanquí anomenat Antoni Pallisé.";
    text(s, 10, 10, windowWidth - 20); // Coloca el texto en (10, 10) y adapta el ancho al canvas

    textSize(16);
    // Dibujar todos los mensajes
    for (let messageBody of messageBodies) {
        let pos = messageBody.body.position;
        let angle = messageBody.body.angle;
        
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
