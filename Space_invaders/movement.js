
//serveix per a quan presionis una tecla s'activi el mov

addEventListener('keydown', ({ key }) => {

    if (game.over) return

    switch (key) {
        case 'a':
            console.log('a')
            keys.a.pressed = true;
            break;

        case 'd':
            console.log('d')
            keys.d.pressed = true;
            break;

        case 'w':
            console.log('w')
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    owner: 'player1'
                })
            )
            break;

        case 'ArrowLeft':
            console.log('ArrowLeft')
            keys.ArrowLeft.pressed = true;
            break;

        case 'ArrowRight':
            console.log('ArrowRight')
            keys.ArrowRight.pressed = true;
            break;

        case 'ArrowUp':
            console.log('space')
            projectiles.push(
                new Projectile({
                    position: {
                        x: player2.position.x + player2.width / 2,
                        y: player2.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    owner: 'player2'
                })
            )
            break;
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 'w':

            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowUp':
            break;
    }
})