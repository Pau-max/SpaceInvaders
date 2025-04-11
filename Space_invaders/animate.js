// Mr.Canvaに表示されているすべてに応じて
//funcion de todo lo que se muestre en nuetro señor canva
function animate() {
    if (!game.active) return
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    player2.update();
    particles.forEach((particel, i) => {

        if (particel.position.y - particel.radius >= canvas.height) {
            particel.position.x = Math.random() * canvas.width
            particel.position.y = - particel.radius

        }

        if (particel.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)

        } else {
            particel.update()
        }
    })


    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
            }, 0)
        } else invaderProjectile.update()

        //projectil golpea al player
        //Si le quitan todas las vidas al Jugador 2 Gana el Jugador 1
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width >= player.position.x && invaderProjectile.position.x <= player.position.x + player.width) {
            console.log('you lose')
            if (vidas == 0) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1);
                    player.opacity = 0
                    game.over = true

                    document.getElementById('winnerMessage').style.display = 'block';
                    document.getElementById('winnerMessage').innerText = '¡Jugador 2 ha ganado!';

                }, 0)

                //es utilitzat per quan el jugador1 mor fer una explosio de partiqules
                createParticles({
                    object: player,
                    color: 'white',
                    fades: true
                })
            } else {
                invaderProjectiles.splice(index, 1);
                vidas -= 1
                vidasEl.innerHTML = vidas
            }
        }

        if (
            invaderProjectile.position.y + invaderProjectile.height >= player2.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player2.position.x &&
            invaderProjectile.position.x <= player2.position.x + player2.width
        ) {
            //Si le quitan todas las vidas al Jugador 2 Gana el Jugador 1
            console.log('Player 2 hit');
            if (vidasP2 == 0) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1);
                    player2.opacity = 0;
                    game.over = true;

                    document.getElementById('winnerMessage').style.display = 'block';
                    document.getElementById('winnerMessage').innerText = '¡Jugador 1 ha ganado!';

                }, 0);

                //es utilitzat per quan el jugador2 mor fer una explosio de partiqules
                createParticles({
                    object: player2,
                    color: 'white',
                    fades: true
                });
            } else {
                invaderProjectiles.splice(index, 1);
                vidasP2 -= 1;
                vidasP2El.innerHTML = vidasP2;
            }
        }

    })



    projectiles.forEach((projectiles, index) => {
        if (projectiles.position.y + projectiles.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectiles.update()
        }
    });

    grids.forEach((grid, gridIndex) => {
        grid.update()

        //Spawnear Projectiles de los Invaders
        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })
            // los projectiles golpean a los invaders
            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y) {


                    setTimeout(() => {

                        //cuan el invader
                        const invaderFound = grid.invaders.find(
                            (invader2) => invader2 === invader
                        )
                        const projectileFound = projectiles.find(
                            (projectile2) => projectile2 === projectile
                        )

                        //eliminar projectiles y invaders
                        if (invaderFound && projectileFound) {
                            if (projectile.owner === 'player1') {
                                score += 1;
                                scoreEl.innerHTML = score;
                            } else if (projectile.owner === 'player2') {
                                scoreP2 += 1;
                                scoreP2El.innerHTML = scoreP2;
                            }
                            //Si el Jugador 1 llega a 100 puntos gana
                            if (score === 100) {
                                setTimeout(() => {
                                    game.active = false;
                                    document.getElementById('winnerMessage').style.display = 'block';
                                    document.getElementById('winnerMessage').innerText = '¡Jugador 1 ha llegado a 100 puntos y ha ganado!';
                                }, 100);
                            }
                            //Si el Jugador 2 llega a 100 puntos gana
                            if (scoreP2 === 100) {
                                setTimeout(() => {
                                    game.active = false;
                                    document.getElementById('winnerMessage').style.display = 'block';
                                    document.getElementById('winnerMessage').innerText = '¡Jugador 2 ha llegado a 100 puntos y ha ganado!';
                                }, 100);
                            }

                            //les celes dels invaders per les cuals es desplaçen
                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                        }
                    }, 0)

                }
            })

        })
    })
    // La velocidad de los movimentos del Jugador 1
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
    //  La velocidad de los movimentos del Jugador 2
    if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
        player2.velocity.x = -7;
        player2.rotation = -0.01;
    } else if (keys.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
        player2.velocity.x = 7;
        player2.rotation = 0.01;
    } else {
        player2.velocity.x = 0;
        player2.rotation = 0;
    }


    //Spawnear Invaders
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
    }



    frames++
}