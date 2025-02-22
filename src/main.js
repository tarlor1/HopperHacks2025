import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';  // Import Game scene

const config = {
    type: Phaser.AUTO,
    title: 'Hopperhacks2',
    parent: 'game-container',
    width: 1920,
    height: 1080,
    pixelArt: true,
    scene: [ Start, Game ],  // Add all scenes here
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

new Phaser.Game(config);
            