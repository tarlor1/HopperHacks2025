export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        // Load tilemap and tileset images
        this.load.tilemapTiledJSON('town', 'assets/hopperland.json');
        this.load.image('grass', 'assets/Tilesets/Grass.png');
        this.load.image('dirt', 'assets/Tilesets/TilledDirt.png'); // Ensure correct path

        this.load.spritesheet('playerSprite', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        console.log("Switching to Game scene");
        // Create tilemap
        const map = this.make.tilemap({ key: 'town' });

        // Add tilesets (names must match Tiled)
        const tileset1 = map.addTilesetImage('grass', 'tileset1');
        const tileset2 = map.addTilesetImage('dirt', 'tileset2'); // Match 'dirt'

        // Create layers
        const groundLayer = map.createLayer('Tile Layer 1', [tileset1, tileset2], 0, 0);

        // Enable collision on ground layer
        groundLayer.setCollisionByProperty({ collides: true });

        // Create player
        this.player = this.physics.add.sprite(100, 100, 'playerSprite');
        this.player.setCollideWorldBounds(true);

        // Add collision
        this.physics.add.collider(this.player, groundLayer);

        // Camera follow player
        this.cameras.main.startFollow(this.player);
    }
}

