const MY_API_KEY = ""; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherInfo = document.getElementById("weatherInfo");
const cityButtons = document.querySelectorAll(".city-btn");
const game = document.querySelector(".game");

let dangerShape = "snow-square";

function updateGameWeatherByTemp(temp){
    game.classList.remove("weather-snow","weather-clouds","weather-clear");
    if(temp<5){ game.classList.add("weather-snow"); dangerShape="snow-square"; }
    else if(temp<=20){ game.classList.add("weather-clouds"); dangerShape="clouds-square"; }
    else{ game.classList.add("weather-clear"); dangerShape="clear-square"; }
}

function fetchWeather(city){
    const API_URL=`${BASE_URL}?q=${city}&appid=${MY_API_KEY}&units=metric`;
    fetch(API_URL)
        .then(res=>res.ok?res.json():Promise.reject())
        .then(data=>{
            const temp=Math.round(data.main.temp);
            weatherInfo.textContent=`${city}: ${temp}°C`;
            updateGameWeatherByTemp(temp);
        })
        .catch(()=>{
            weatherInfo.textContent=`${city}: data not available`;
            updateGameWeatherByTemp(15);
        });
}

cityButtons.forEach(btn=>btn.addEventListener("click",()=>fetchWeather(btn.dataset.city)));


const penguin = document.querySelector('.penguin');
const gameOverText = document.getElementById("gameOverText");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameOverSound = new Audio('sound/game over.wav');

let gameRunning=false, score=0, level=1, fallSpeed=4;
let penguinX = 50;


const hud = document.createElement("div");
hud.style.position="absolute";
hud.style.top="5px";
hud.style.left="10px";
hud.style.fontSize="16px";
hud.style.fontFamily="Arial";
hud.style.color="#003366";
game.appendChild(hud);

function updateHUD(){ hud.textContent=`Score: ${score} | Level: ${level}`; }


document.addEventListener('keydown', e=>{
    if(!gameRunning) return;
    if(['ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault();
    if(e.code==='ArrowLeft') penguinX -= 25;
    if(e.code==='ArrowRight') penguinX += 25;
    penguinX = Math.max(0, Math.min(game.clientWidth - penguin.offsetWidth, penguinX));
    penguin.style.left = penguinX+'px';
});


let isDragging = false;

penguin.addEventListener('mousedown', () => { isDragging = true; });
document.addEventListener('mousemove', e => {
    if(!gameRunning || !isDragging) return;
    const rect = game.getBoundingClientRect();
    let newX = e.clientX - rect.left - penguin.offsetWidth / 2;
    newX = Math.max(0, Math.min(game.clientWidth - penguin.offsetWidth, newX));
    penguin.style.left = newX + 'px';
});
document.addEventListener('mouseup', () => { isDragging = false; });


penguin.addEventListener('touchstart', () => { isDragging = true; });
document.addEventListener('touchmove', e => {
    if(!gameRunning || !isDragging) return;
    const touch = e.touches[0];
    const rect = game.getBoundingClientRect();
    let newX = touch.clientX - rect.left - penguin.offsetWidth / 2;
    newX = Math.max(0, Math.min(game.clientWidth - penguin.offsetWidth, newX));
    penguin.style.left = newX + 'px';
});
document.addEventListener('touchend', () => { isDragging = false; });


function spawnObject(){
    if(!gameRunning) return;

    const obj = document.createElement('div');
    obj.classList.add('falling');

    const type = Math.random()<0.6?"fish":"danger";
    if(type==="fish") obj.classList.add('fish');
    else { obj.classList.add('danger'); obj.dataset.shape=dangerShape; }

    const x = Math.random()*(game.clientWidth - 40);
    obj.style.left = x+'px';
    obj.style.top = '-40px';
    game.appendChild(obj);

    let y=-40;
    const fall = setInterval(()=>{
        if(!gameRunning){ clearInterval(fall); obj.remove(); return; }
        y+=fallSpeed;
        if(y + obj.offsetHeight > game.clientHeight) y = game.clientHeight - obj.offsetHeight;
        obj.style.top = y+'px';

        const penguinRect = penguin.getBoundingClientRect();
        const objRect = obj.getBoundingClientRect();
        const overlap = !(penguinRect.right<objRect.left || penguinRect.left>objRect.right || penguinRect.bottom<objRect.top || penguinRect.top>objRect.bottom);

        if(overlap){
            clearInterval(fall);
            if(obj.classList.contains('fish')){
                score++;
                updateHUD();
                if(score % 10 === 0){
                    level++;
                    fallSpeed += 2; 
                    showLevel(level);
                }
            } else endGame();
            obj.remove();
        }

        if(y >= game.clientHeight - obj.offsetHeight){
            clearInterval(fall);
            obj.remove();
        }
    },20);

    setTimeout(spawnObject, 500);
}


const levelText = document.createElement('div');
levelText.style.position = 'absolute';
levelText.style.top = '-40px';
levelText.style.width = '100%';
levelText.style.textAlign = 'center';
levelText.style.fontFamily = "'WinterDay'";
levelText.style.fontSize = '30px';
levelText.style.color = '#003366';
levelText.style.textShadow = '2px 2px 4px #fff';
levelText.style.opacity = '0';
levelText.style.transition = 'opacity 0.5s ease';
game.appendChild(levelText);

function showLevel(l){
    levelText.textContent=`LEVEL ${l}`;
    levelText.style.opacity='1';
    setTimeout(()=>levelText.style.opacity='0',2000);
}


function startGame(){
    startScreen.style.display='none';
    gameOverText.classList.remove('show');
    restartButton.style.display='none';
    gameRunning=true; score=0; level=1; fallSpeed=4;
    penguinX = 50;
    penguin.style.left = penguinX+'px';
    updateHUD();
    spawnObject();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);


function endGame(){
    gameRunning=false;
    gameOverSound.currentTime=0;
    gameOverSound.play();
    gameOverText.classList.remove('hidden');
    restartButton.style.display='block';
    setTimeout(()=>gameOverText.classList.add('show'),50);
}
