const game = document.querySelector('.game');
const penguin = document.querySelector('.penguin');
const gameOverText = document.getElementById("gameOverText");
const restartButton = document.getElementById("restartButton");

const levelUpText = document.createElement('div');
levelUpText.style.position = 'absolute';
levelUpText.style.top = '5px';
levelUpText.style.width = '100%';
levelUpText.style.textAlign = 'center';
levelUpText.style.fontFamily = "'WinterDay'";
levelUpText.style.fontSize = '30px';
levelUpText.style.color = '#003366';
levelUpText.style.textShadow = '2px 2px 4px #fff';
levelUpText.style.opacity = '0';
levelUpText.style.transition = 'opacity 0.5s ease';
game.appendChild(levelUpText);

let isJumping = false;
let gameRunning = true;
let isHolding = false;
let maxJump = 160;

penguin.style.bottom = '0px';


const levels = [
    { speed: 5, interval: 2000, duration: 15, obstacles: 1 },
    { speed: 8, interval: 1800, duration: 20, obstacles: 2 },
    { speed: 12, interval: 1500, duration: 25, obstacles: 3 }
];

let currentLevel = 0;
let obstacleSpeed = levels[currentLevel].speed;
let obstacleInterval = levels[currentLevel].interval;
let obstaclesPerWave = levels[currentLevel].obstacles;


const gameOverSound = new Audio('sound/game over.wav');

function showLevelUp(level) {
    levelUpText.textContent = `LEVEL ${level}`;
    levelUpText.style.opacity = '1';
    setTimeout(() => {
        levelUpText.style.opacity = '0';
    }, 2500);
}

function nextLevel() {
    if (!gameRunning) return;

    if (currentLevel < levels.length - 1) {
        currentLevel++;
        obstacleSpeed = levels[currentLevel].speed;
        obstacleInterval = levels[currentLevel].interval;
        obstaclesPerWave = levels[currentLevel].obstacles;
        showLevelUp(currentLevel + 1);

        setTimeout(() => {
            if (gameRunning) nextLevel();
        }, levels[currentLevel].duration * 1000);
    }
}

setTimeout(nextLevel, levels[currentLevel].duration * 1000);

function jump() {
    if (isJumping || !gameRunning) return;

    isJumping = true;
    let jumpHeight = 0;

    let upInterval = setInterval(() => {
        let bottom = parseInt(penguin.style.bottom);

        if (jumpHeight >= 80) {
            clearInterval(upInterval);

            let holdInterval = setInterval(() => {
                bottom = parseInt(penguin.style.bottom);

                if (!isHolding || jumpHeight >= maxJump) {
                    clearInterval(holdInterval);

                    let downInterval = setInterval(() => {
                        bottom = parseInt(penguin.style.bottom);

                        if (bottom <= 0) {
                            clearInterval(downInterval);
                            isJumping = false;
                            penguin.style.bottom = '0px';
                        } else {
                            penguin.style.bottom = (bottom - 5) + 'px';
                        }
                    }, 20);

                } else {
                    penguin.style.bottom = (bottom + 5) + 'px';
                    jumpHeight += 5;
                }

            }, 20);

        } else {
            penguin.style.bottom = (bottom + 5) + 'px';
            jumpHeight += 5;
        }
    }, 20);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        isHolding = true;
        jump();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        isHolding = false;
    }
});

function createObstacle() {
    if (!gameRunning) return;

    for (let i = 0; i < obstaclesPerWave; i++) {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = (800 + i * 100) + 'px';
        game.appendChild(obstacle);

        let moveObstacle = setInterval(() => {
            if (!gameRunning) {
                clearInterval(moveObstacle);
                return;
            }

            let obstacleLeft = parseInt(obstacle.style.left);
            let penguinBottom = parseInt(penguin.style.bottom);

            if (obstacleLeft > 50 && obstacleLeft < 100 && penguinBottom < 25) {
                clearInterval(moveObstacle);
                gameOver();
                return;
            }

            if (obstacleLeft < -150) {
                clearInterval(moveObstacle);
                obstacle.remove();
            } else {
                obstacle.style.left = (obstacleLeft - obstacleSpeed) + 'px';
            }
        }, 20);
    }

    setTimeout(createObstacle, obstacleInterval);
}

function gameOver() {
    gameRunning = false;
    gameOverSound.play();
    gameOverText.classList.remove("hidden");

    setTimeout(() => {
        gameOverText.classList.add("show");
    }, 50);
}

restartButton.addEventListener("click", () => {
    location.reload();
});

createObstacle();


