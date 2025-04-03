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

        this.rotation = 0;

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
            c.save()
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

    update(){
        if (this.image){
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

}

//es per crear el projectil
class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;

        this.radius = 3;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0,
            Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}

const projectiles = []

// constant para el Player
const player = new Player();

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    space:{
        pressed: false
    }
}


// Mr.Canvaに表示されているすべてに応じて
//funcion de todo lo que se muestre en nuetro señor canva
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    projectiles.forEach((projectiles, index) => {
        if(projectiles.position.y + projectiles.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }else{
            projectiles.update()
        }
        
    });

    if (keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -7;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width ){
        player.velocity.x = 7;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
}


// execute order animate 
animate();

//serveix per a quan presionis una tecla s'activi el mov
addEventListener('keydown', ({ key }) => {
    switch (key){
        case 'a':
            console.log('a')
            keys.a.pressed = true;
            break;
        
        case 'd':
            console.log('d')
            keys.d.pressed = true;
            break;

        case ' ':
            console.log('space')
            projectiles.push (
                new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            })
        )
            break;
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key){
        case 'a':
            keys.a.pressed = false;
            break;
        
        case 'd':
            keys.d.pressed = false;
            break;

        case ' ':

            break;
    }
})
