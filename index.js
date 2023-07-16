const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 900
canvas.width = 1600

//filling window
c.fillRect(0,0,canvas.width,canvas.height)


//elements
const startButtonDiv = document.getElementById('startBtnDiv')
const startButton = document.getElementById('startBtn')
const restartButton = document.getElementById('restartBtn')
const displayText = document.getElementById('displayText')
const displayWinner = document.getElementById('displayT')
const enemyHealth = document.getElementById('enemyHealth')
const playerHealth = document.getElementById('playerHealth')


//SOUNDS
const introSound = new Audio('./sounds/Intro sound.wav')
const gameMusic = new Audio('./sounds/game-music.mp3')
const sword1= new Audio('./sounds/sword.mp3')
const sword2= new Audio('./sounds/sword.mp3')
const running = new Audio('./sounds/running-sound-effect.mp3')
const win = new Audio('./sounds/Win sound.wav')


let timer 
let player
let enemy
let background = null 
let shops = null 
let animateFrame 
let startAnimate
let isIntroSoundPlayed = false;

const gravity = 0.4






//background
background = new Sprite({
    position:{
        x:0,
        y:0 
    },
    imageSrc: './files/background.png',
    scale:1.80
})


//shops 
shops = new Sprite({
    position:{
        x:1100,
        y:400
    },
    imageSrc: './files/shop.png',
    framesMax: 6,
    scale:3.6
})




function firstAnimate(){
    startAnimate = window.requestAnimationFrame(firstAnimate)

    // document.addEventListener(('mousemove'),(event)=>{
    //     if(!isIntroSoundPlayed){
    //         introSound.play()
    //         isIntroSoundPlayed = true
    //     }
    //     setTimeout(() => {
    //         introSound.pause();
    //         introSound.currentTime = 0;
    //     }, 3500);
    // })

    //BACKGROUND
    background.update()

    //shop
    shops.update()
}

startButtonDiv.style.display = 'flex'
firstAnimate()





function init(){
    animateFrame = cancelAnimationFrame(animateFrame)
    player = null 
    enemy = null 
    gameOver = false 
    timer = 60
    gameMusic.currentTime = 0
    gameMusic.play()
    
    //PLAYER
    player = new Fighter({
        position:{
            x:400,
            y:400
        },
        velocity:{
            x:0,
            y:0
        },
        offset:{
            x:0,
            y:0
        },
        scale:3,
        imageSrc: './files/samuraiMack/Idle.png',
        framesMax:8,
        offset:{
            x:215,
            y:115
        },
        sprites:{
            idle:{
                imageSrc:'./files/samuraiMack/Idle.png',
                framesMax:8
            },
            run:{
                imageSrc:'./files/samuraiMack/Run.png',
                framesMax:8
            },
            jump:{
                imageSrc:'./files/samuraiMack/Jump.png',
                framesMax:2
            },
            fall:{
                imageSrc:'./files/samuraiMack/Fall.png',
                framesMax:2
            },
            attack1:{
                imageSrc:'./files/samuraiMack/Attack1.png',
                framesMax:6
            },
            attack2:{
                imageSrc:'./files/samuraiMack/Attack2.png',
                framesMax:6
            },
            takeHit: {
                imageSrc: './files/samuraiMack/TakeHit.png',
                framesMax: 4
            },
            death: {
                imageSrc: './files/samuraiMack/Death.png',
                framesMax: 6
            }
        },
        attackBox:{
            offset:{
                x:100,
                y:50
            },
            width:150,
            height:50
        }
    })

    //ENEMY
    enemy = new Fighter({
        position:{
            x:800,
            y:400
        },
        velocity:{
            x:0,
            y:0
        },
        offset:{
            x:200,
            y:0
        },
        scale:3,
        imageSrc:'./files/kenji/Idle.png',
        framesMax:4,
        offset:{
        x:215,
        y:130
        },
        sprites:{
            idle:{
                imageSrc:'./files/kenji/Idle.png',
                framesMax:4
            },
            run:{
                imageSrc:'./files/kenji/Run.png',
                framesMax:8
            },
            jump:{
                imageSrc:'./files/kenji/Jump.png',
                framesMax:2
            },
            fall:{
                imageSrc:'./files/kenji/Fall.png',
                framesMax:2
            },
            attack1:{
                imageSrc:'./files/kenji/Attack1.png',
                framesMax:4
            },
            attack2:{
                imageSrc:'./files/kenji/Attack2.png',
                framesMax:4
            },
            takeHit: {
                imageSrc: './files/kenji/TakeHit.png',
                framesMax: 3
            },
            death: {
                imageSrc: './files/kenji/Death.png',
                framesMax: 7
            }
        },
        attackBox:{
            offset:{
                x:-180,
                y:50
            },
            width:150,
            height:50
        }
    })

    enemyHealth.style.width = `${enemy.health}%`
    playerHealth.style.width = `${player.health}%`
}




function startGame(){
    init()
    animateFrame = requestAnimationFrame(animate)
    startAnimate = cancelAnimationFrame(startAnimate)
    decreaseTimer()
}

function endGame(dead){
    timer = 0
    win.play()
    setTimeout(()=>{
        win.pause()
        win.currentTime = 0
    },2000)
    gameMusic.pause()
    gameMusic.currentTime = 0
    displayText.style.display = 'flex'

    if(dead==='player'){
        player.switchSprite('death')
        displayWinner.innerHTML = 'PLAYER 2 WON'
    } else if(dead === 'enemy'){
        enemy.switchSprite('death')
        displayWinner.innerHTML = 'PLAYER 1 WON'
    }
}


function animate(){
    animateFrame = window.requestAnimationFrame(animate)
    
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)

    //BACKGROUND
    background.update()

    //shop
    shops.update()

    //PLAYER
    player.update()
    player.velocity.x = 0

    //CHECKING PLAYER MOVEMENT
    //player.switchSprite('idle')
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -3
        player.switchSprite('run')
    } 
    else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 3
        player.switchSprite('run')
    } 
    else{
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump')
    } else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }
    
    //ENEMY
    enemy.update()
    enemy.velocity.x = 0
    //CHECKING ENEMY MOVEMENT
    //enemy.switchSprite('idle')
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('run')
        enemy.velocity.x = -3
    } 
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('run')
        enemy.velocity.x = 3
    } else{
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }


    //player attacking
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking && player.framesCurrent === 4){
        enemy.takeHit()
        sword1.play()
        setTimeout(()=>{
            sword1.pause()
            sword1.currentTime = 0
        },500)
        player.isAttacking = false
        enemyHealth.style.width = `${enemy.health}%`
    }
    //if player misses
    if(player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false 
    }

    //enemy attacking
    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking && enemy.framesCurrent === 2){
        player.takeHit()
        sword2.play()
        setTimeout(()=>{
            sword2.pause()
            sword2.currentTime = 0
        },500)
        enemy.isAttacking = false
        playerHealth.style.width = `${player.health}%`
    }
     //if enemy misses
     if(enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false 
    }


    //determine winner
    if(player.health <= 0){
        endGame(dead='player')
    } else if (enemy.health <= 0){
        endGame(dead='enemy')
    }

    if(player.health === enemy.health && timer === 0 && !player.dead && !enemy.dead){
        displayWinner.innerHTML = 'TIE'
        endGame()
    } else if(player.health > enemy.health && timer === 0 && !player.dead && !enemy.dead){
        endGame(dead='enemy')
    } else if(player.health < enemy.health && timer === 0 && !player.dead && !enemy.dead){
        endGame(dead='player')
    }
}



startButton.addEventListener('click', ()=>{
    startGame()
    startButtonDiv.style.display = 'none'
})

restartButton.addEventListener('click', ()=>{
    startGame()
    displayText.style.display = 'none'
})
