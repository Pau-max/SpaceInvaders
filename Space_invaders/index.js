const scoreEl = document.querySelector('#scoreEl');
const vidasEl = document.querySelector('#vidasEl');
const scoreP2El = document.querySelector('#scoreP2El');
const vidasP2El = document.querySelector('#vidasP2El');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //context del fons (2d)

canvas.width = 1024; //amplada de la pestanya
canvas.height = 576; //alçada de la pestanya

class Player {
    // constructor del PLayer
    constructor() {



        // La velocidad inicial del jugador 
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;
        this.opacity = 1

        // contant del player
        const image = new Image();
        image.src = './img/spaceship.png'
        image.onload = () => {
            const scale = 0.15;
            // tamany imatge
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            // La posicion inicial del jugador
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }


    }





    // dibujar imagne del la nave del player
    draw() {
        //vc.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        c.rotate(this.rotation);
        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        c.restore()

    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

}

//es per crear el projectil del player
class Projectile {
    constructor({ position, velocity, owner }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 4;
        this.owner = owner; // 'player1' o 'player2'
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0,
            Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

//Particula para la explosion de la muerte del invader
class Particle {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position;
        this.velocity = velocity;

        this.radius = radius;
        this.color = color;
        this.opacity = 1

        this.fades = fades
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0,
            Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore()
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if (this.fades) this.opacity -= 0.01
    }
}

//projectil del invader
class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        this.width = 3
        this.height = 10

    }

    //es pinta el projectil del invader
    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

//Clase para el invader
class Invader {
    // constructor del Invader
    constructor({ position }) {
        this.velocity = {
            x: 0,
            y: 0
        }


        // contant del Invader
        const image = new Image();
        image.src = './img/invader.png';
        image.onload = () => {
            const scale = 1;
            // tamany imatge
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }


    }

    // dibujar imagne del Invader
    draw() {
        //vc.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

    }

    update({ velocity }) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    //projectil que surt desde el invaders
    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }))

    }

}


// Classe para que el invader se mueva
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 30,
                        y: y * 30
                    }
                }))
            }
        }

    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Para que vayan bajando
        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            //Para que vayan bajando
            this.velocity.y = 30
        }
    }


}


const projectiles = [];
const grids = [];
const invaderProjectiles = []
const particles = []


// constant para el Player
const player = new Player();
const player2 = new Player();

//constants de les tecles utilitzades per els dos jugadors
//recordar que aixo no significa que sigui la tecla es nomes un parametre per saber si a estat premuda o no
const keys = {
    //constant de les tecles utilitzades per el player1
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    //constant de les tecles utilitzades per el player2
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let frames = 0

//interval aleatori de generacio dels invaders
let randomInterval = Math.floor(Math.random() * 500 + 500)
let game = {
    over: false,
    active: true
}

//vidas i puntuacio dels jugadors
let vidas = 4;
let score = 0;

let vidasP2 = 4;
let scoreP2 = 0;

for (let i = 0; i < 100; i++) {
    //Caracteristicas de las particulas 
    particles.push(new Particle({

        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: 0.3
        },
        radius: Math.random() * 2,
        color: 'white'
    }))
}

//Creacion de la particulas per a les explocions de mort
function createParticles({ object, color, fades }) {
    for (let i = 0; i < 15; i++) {
        //Caracteristicas de las particulas 
        particles.push(new Particle({

            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || '#BAA0DE',
            fades: true
        }))
    }
}




// execute function animate 
animate();