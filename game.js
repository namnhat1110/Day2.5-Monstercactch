/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images.
*/

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.getElementById('canvas').appendChild(canvas);

let bg = {};

/**
 * Setting up our characters.
 *
 * Note that hero.x represents the X position of our hero.
 * hero.y represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * The same goes for the monsters
 *
 */

 var lives = 3;

let hero = { x: canvas.width / 2, y: canvas.height / 2 };
let monsters = [
	{ x: 100, y: 100 },
	{ x: 200, y: 200 },
	{ x: 300, y: 300 },
	{ x: 400, y: 400 },
	{ x: 400, y: 100 },
	{ x: 100, y: 400 },
];

let potion = [
	{ x: 200, y: 100 },
	{ x: 200, y: 400 },
];


// Scoreboard

const applicationState = {
	isGameOver: false,
	currentUser: '',
	highScore: '123',
	gameHistory: [{ user: '', score: 0, date: '' }],
};

console.log({ applicationState });

let startTime = Date.now();
const SECONDS_PER_ROUND = 15;
let elapsedTime = 0;



function loadImages() {
	bg.image = new Image();

	bg.image.onload = function () {
		// show the background image
		bg.ready = true;
	};
	bg.image.src = 'images/background.png';
	hero.image = new Image();
	hero.image.onload = function () {
		// show the hero image
		hero.ready = true;
	};
	hero.image.src = 'images/hero.png';

	monsters.forEach((monster, i) => {
		monster.image = new Image();
		monster.image.onload = function () {
			// show the monster image
			monster.ready = true;
		};
		monster.image.src = `images/monster_${i + 1}.png`;
	});

	potion.forEach((potion, i) => {
		potion.image = new Image();
		potion.image.onload = function () {
			// show the potion image
			potion.ready = true;
		};
		potion.image.src = `images/potion_${i + 1}.png`;
	});
}

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysPressed = {};
function setupKeyboardListeners() {
	// Check for keys pressed where key represents the keycode captured
	// For now, do not worry too much about what's happening here.
	document.addEventListener(
		'keydown',
		function (e) {
			keysPressed[e.key] = true;
		},
		false
	);

	document.addEventListener(
		'keyup',
		function (e) {
			keysPressed[e.key] = false;
		},
		false
	);
}

function randomlyPlace(axis) {
	// const maximum = axis === 'x' ? canvas.width : canvas.height
	// var randomnumber = Math.floor(Math.random() * (maximum - 0 + 1)) + 0;

	// return randomnumber
	if (axis === 'x') {
		return Math.floor(Math.random() * canvas.width + 1);
	} else {
		return Math.floor(Math.random() * canvas.height + 1);
	}
}
/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
	// Update the time.
	var finish = false

	elapsedTime = Math.floor((Date.now() - startTime) / 1000);

	if (elapsedTime <= 0) {
		finish = true
		monsterReady=false;
     	heroReady=false;

	}

	if (keysPressed['ArrowUp']) {
		hero.y -= 5;
	}
	if (keysPressed['ArrowDown']) {
		hero.y += 5;
	}
	if (keysPressed['ArrowLeft']) {
		hero.x -= 5;
	}
	if (keysPressed['ArrowRight']) {
		hero.x += 5;
	}

	const offcanvasleft = hero.x <= 0
	const offcanvasright = hero.x >= canvas.width
	if(offcanvasleft){
		hero.x = canvas.width
	} else if(offcanvasright){
		hero.x = 0
	}

	const offcanvastop = hero.y <=0
	const offcanvasbot = hero.y >= canvas.height
	if(offcanvastop){
		hero.y = canvas.height
	} else if(offcanvasbot){
		hero.y = 0
	}

	// Check if player and monster collided. Our images
	// are 32 pixels big.
	monsters.forEach((monster) => {
		const monsterCaughtbyHero =
			hero.x <= monster.x + 32 &&
			monster.x <= hero.x + 32 &&
			hero.y <= monster.y + 32 &&
			monster.y <= hero.y + 32;
		if (monsterCaughtbyHero) {
			monster.x = randomlyPlace('x');
			monster.y = randomlyPlace('y');
			applicationState.highScore.score++
			applicationState.gameHistory.score++
			console.log({applicationState})
		}
	});

	potion.forEach((potion) => {
		const potionCaughtbyHero =
			hero.x <= potion.x + 32 &&
			potion.x <= hero.x + 32 &&
			hero.y <= potion.y + 32 &&
			potion.y <= hero.y + 32;
		if (potionCaughtbyHero) {
			potion.x = randomlyPlace('x');
			potion.y = randomlyPlace('y');
			// hero.y -= 20;
			// hero.y += 20;
			// hero.x -= 20;
			// hero.x += 20;
		}
	});


};

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#black";
    ctx.fillText("Lives: "+lives, canvas.width/3, canvas.height/3);
}


/**
 * This function, render, runs as often as possible.
 */

 

function render() {
	
	
	if (bg.ready) {
		ctx.drawImage(bg.image, 0, 0);
	}
	if (hero.ready) {
		ctx.drawImage(hero.image, hero.x, hero.y);
	}
	monsters.forEach((monster) => {
		if (monster.ready) {
			ctx.drawImage(monster.image, monster.x, monster.y);
		}
	});
	potion.forEach((potion) => {
		if (potion.ready) {
			ctx.drawImage(potion.image, potion.x, potion.y);
		}
	});
	
	ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
	
}

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */

function main() {
	
	update();
	render();
	// Request to do this again ASAP. This is a special method
	// for web browsers.
	requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


document.getElementById("sign-in").addEventListener('click', function () {
	console.log('click')
	applicationState.currentUser = document.getElementById("username").value
	document.getElementById("username").value = ''
	localStorage.setItem('User', applicationState.currentUser)

	document.getElementById("signin-form").style.display = 'none'
	document.getElementById("signout-form").style.display = 'block'
	document.getElementById('username-prompt').innerHTML = applicationState.currentUser
	console.log({ applicationState })
});

document.getElementById("sign-out").addEventListener('click', function () {

	localStorage.removeItem('User')

	document.getElementById("signout-form").style.display = 'none'
	document.getElementById("signin-form").style.display = 'block'
	document.getElementById('username-prompt').innerHTML = applicationState.currentUser
	console.log({ applicationState })
});

function checkifloggedin() {
	const username = localStorage.getItem('User');
	console.log({ username });
	if (username) {
		document.getElementById("signin-form").style.display = 'none';
		document.getElementById("username-prompt").innerHTML = applicationState.currentUser
		document.getElementById("signout-form").style.display = 'block'
	}
}



function displayscore() {
	applicationState.highScore = document.getElementById("score-board").value
	document.getElementById("score-board").value = ''
	localStorage.setItem('Myscore', applicationState.highScore)

	console.log({applicationState})
	const scores = localStorage.getItem('Myscore')
	if (scores) {}
	document.getElementById("display").innerHTML = scores;
  }

// var scores = localStorage.getItem('Myscore', applicationState.highScore)

// Let's play this game!
loadImages();
drawLives();
setupKeyboardListeners();
main();
