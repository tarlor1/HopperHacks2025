import { Start } from "./scenes/Start.js";
import { Game } from "./scenes/Game.js"; // Import Game scene
import { Login } from "./scenes/Login.js";
import { UIScene } from "./scenes/UIScene.js";
import { HabitTracking } from "./scenes/HabitTracking.js";
import { Shop } from "./scenes/Shop.js";
import { Dungeon } from "./scenes/Dungeon.js";

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
	scene: [Start, Login, UIScene, Game, HabitTracking, Dungeon, Shop], // Add all scenes here
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

new Phaser.Game(config);
