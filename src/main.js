<<<<<<< HEAD
import { Start } from "./scenes/Start.js";
import { Game } from "./scenes/Game.js"; // Import Game scene
import { Login } from "./scenes/Login.js";
import { UIScene } from "./scenes/UIScene.js";

const config = {
	type: Phaser.AUTO,
	title: "Hopperhacks2",
	parent: "game-container",
	dom: {
		createContainer: true,
	},
	width: 1920,
	height: 1080,
	pixelArt: true,
	scene: [Start, Game, Login, UIScene], // Add all scenes here
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
=======
import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';  // Import Game scene
import { Login } from './scenes/Login.js';
import { HabitTracking } from './scenes/HabitTracking.js';

const config = {
    type: Phaser.AUTO,
    title: 'Hopperhacks2',
    parent: 'game-container',
    dom: {
        createContainer: true
    },
    width: 1920,
    height: 1080,
    pixelArt: true,
    scene: [ Start, Login, Game, HabitTracking ],  // Add all scenes here
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
>>>>>>> 5a2689e0c0eed22b469a630d3042fdabf47b1a99
};

new Phaser.Game(config);
