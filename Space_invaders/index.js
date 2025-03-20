const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //context del fons (2d)

canvas.width = innerWidth; //amplada de la pestanya
canvas.height = innerHeight; //alçada de la pestanya

class Player {
    // constructor del PLayer
    constructor() {
        // La posicion inicial del jugador

        // La velocidad inicial del jugador 
        this.velocity = {
            x: 0,
            y: 0
        }
        // contant del player
        const image = new Image();
        image.src = './img/spaceship.png';
        image.onload = () => {
            const scale = 0.15;
            // tamany imatge
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
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
        if (this.image) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
    }
}
// constant para el Player
const player = new Player();
player.draw();


// Mr.Canvaに表示されているすべてに応じて
//funcion de todo lo que se muestre en nuetro señor canva
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
}


// execute order animate 
animate();