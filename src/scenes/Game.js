export class Game extends Phaser.Scene {
    constructor() {
        var player;
        var cursors;
        super('Game');
    }

    preload() {
        // Load tilemap and tileset images
        this.load.tilemapTiledJSON('town', 'assets/hopperland.json');
        this.load.image('grass', 'assets/Tilesets/Grass.png');
        this.load.image('dirt', 'assets/Tilesets/TilledDirt.png'); // Ensure correct path

        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        console.log("Switching to Game scene");

        // Create tilemap
        const map = this.make.tilemap({ key: 'town' });

        // Add tilesets (names must match Tiled)
        const tileset1 = map.addTilesetImage('Grass', 'grass');  // Match 'Grass' in Tiled
        const tileset2 = map.addTilesetImage('TilledDirt', 'dirt');  // Match 'TilledDirt' in Tiled

        // Create layers
        const grassLayer = map.createLayer('GrassLayer', tileset1, 0, 0);
        const dirtLayer = map.createLayer('DirtLayer', tileset2, 0, 0);

        // Make sure the layers are visible
        grassLayer.setVisible(true);
        dirtLayer.setVisible(true);

        // Enable collision on layers
        // grassLayer.setCollisionByProperty({ collides: true });
        // dirtLayer.setCollisionByProperty({ collides: true });

        // Create player with physics
        this.player = this.add.sprite(100, 100, 'dude');  // Use physics sprite here
        this.cursors = this.input.keyboard.createCursorKeys();

        // Camera follow player
        this.cameras.main.startFollow(this.player);

        // Create animations
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Set collide world bounds for the player
        // this.player.setCollideWorldBounds(true);

        // // Add collision between player and layers
        // this.physics.add.collider(this.player, grassLayer);
        // this.physics.add.collider(this.player, dirtLayer);
    }

    update() {
        // Move player using arrow keys
        if (this.cursors.left.isDown) {
            this.player.x -= 4;  // Move left
        }
        else if (this.cursors.right.isDown) {
            this.player.x += 4;  // Move right
        }
        if (this.cursors.up.isDown) {
            this.player.y -= 4;  // Move up
        }
        else if (this.cursors.down.isDown) {
            this.player.y += 4;  // Move down
        }
    }
}
