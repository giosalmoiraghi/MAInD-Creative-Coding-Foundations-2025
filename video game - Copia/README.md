# Assignment 03

**Brief:**  
Upgrade the **Assignment 02** by adding the use of data coming from an external web API. For example, fetch contents (audio, images, video, text, metadata) from online archives, AI generated contents (chatGPT API), data (weather, realtime traffic data, environmental data).

Have a look at the lesson about the API:

[https://wind-submarine-3d4.notion.site/Lesson-5-200d516637bc811aba69e13b0ffe438f?pvs=74](https://www.notion.so/Lesson-5-200d516637bc811aba69e13b0ffe438f?pvs=21)

The application **must** have those requirements:

- The webpage is responsive
- Use a web API (you choose which one best fists for your project) to load the data and display them in the webpage
- At least one multimedia file (for user feedback interactions, or content itself)
- Develop a navigation system that allows the user to navigate different sections with related content and functionalities

**Screenshots:**  

![Gameplay Screenshot 1](screen assignment 03.jpg)
![Gameplay Screenshot 2](screen 2 assignment 03.jpg)

**Short project description:**  
Arcade game where a penguin collects fish while avoiding falling obstacles. The game integrates weather data from OpenWeatherMap to change the background based on temperature. The player can move the penguin using the arrow keys or by dragging it with the mouse. Score increases by collecting fish, and every 10 points the level rises, increasing obstacle speed. Colliding with a danger ends the game with a game over message and option to restart.

**List of functions:**  
- fetchWeather(city) – Calls the OpenWeatherMap API to get the temperature for a selected city and updates the game background accordingly.
- updateGameWeatherByTemp(temp) – Changes the game background and obstacle style depending on the temperature.
- spawnObject() – Generates fish or danger objects at random positions, makes them fall, detects collisions with the penguin, and removes them when caught or off-screen.
- updateHUD() – Updates the score and level display.
- showLevel(level) – Displays a temporary “LEVEL X” message when the player levels up.
- startGame() – Starts or restarts the game, resetting score, level, and fall speed, and hides the start/restart buttons.
- endGame() – Stops the game, shows the GAME OVER message, and plays the game over sound.

**Files:**  
- index.html
- style.css
- script.js
- Sound: https://mixkit.co/
- Font: WInter Day
- Images: created by me

## Game Flow Diagram

![Game Flow Diagram](diagram assignment 03.png)