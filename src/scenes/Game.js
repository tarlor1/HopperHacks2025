import { UIScene } from "./UIScene.js";

export class Game extends Phaser.Scene {
	constructor() {
		var player;
		var cursors;
		super("Game");
	}

	preload() {
		// Load tilemap and tileset images
		this.load.tilemapTiledJSON("town", "assets/hopperland.json");
		this.load.image("grass", "assets/Tilesets/Grass.png");
		this.load.image("dirt", "assets/Tilesets/TilledDirt.png"); // Ensure correct path
		this.load.image("buildings", "assets/storeandhabits.png");
		this.load.spritesheet("dude", "assets/dude.png", {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	create() {
		if (!this.scene.isActive("UIScene")) {
			this.scene.launch("UIScene");
		}
		this.uiScene = this.scene.get("UIScene");

		// Example: Displaying UI values (HP, stamina, and coins)
		console.log("Player HP:", this.uiScene.hp);
		console.log("Player Stamina:", this.uiScene.stamina);
		console.log("Player Coins:", this.uiScene.coins);

		console.log("Switching to Game scene");

		// Create tilemap
		const map = this.make.tilemap({ key: "town" });

		// Add tilesets (names must match Tiled)
		const tileset1 = map.addTilesetImage("Grass", "grass"); // Match 'Grass' in Tiled
		const tileset2 = map.addTilesetImage("TilledDirt", "dirt"); // Match 'TilledDirt' in Tiled
		const tileset3 = map.addTilesetImage(
			"storeandhabits",
			"buildings",
		);

		// Create layers
		const grassLayer = map.createLayer("GrassLayer", tileset1, 0, 0);
		const dirtLayer = map.createLayer("DirtLayer", tileset2, 0, 0);
		const buildingLayer = map.createLayer(
			"BuildingLayer",
			tileset3,
			0,
			0,
		);

		// Make sure the layers are visible
		grassLayer.setVisible(true);
		dirtLayer.setVisible(true);
		buildingLayer.setVisible(true);

		// Enable collision on layers
		// grassLayer.setCollisionByProperty({ collides: true });
		// dirtLayer.setCollisionByProperty({ collides: true });

		// Create player with physics
		this.player = this.add.sprite(100, 100, "dude"); // Use physics sprite here
		this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);  // 'E' key for interaction

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

        // Trigger areas for HabitTracking and Shop
        this.habitTrackingArea = new Phaser.Geom.Rectangle(32*11, 69, 32, 32); // Example area for HabitTracking
        this.shopArea = new Phaser.Geom.Rectangle(32*18, 69, 32, 32); // Example area for Shop
		this.dungeonArea = new Phaser.Geom.Rectangle(408, 488, 32*4, 32*4);


		// Set collide world bounds for the player
		// this.player.setCollideWorldBounds(true);

		// // Add collision between player and layers
		// this.physics.add.collider(this.player, grassLayer);
		// this.physics.add.collider(this.player, dirtLayer);
	}

	update() {
        console.log(this.player.x); 
        console.log(this.player.y);
		if (this.cursors.left.isDown) {
			this.player.x -= 4;
			this.player.anims.play("left", true);
		} else if (this.cursors.right.isDown) {
			this.player.x += 4;
			this.player.anims.play("right", true);
		}

		if (this.cursors.up.isDown) {
			this.player.y -= 4;
			this.player.anims.play("turn", true);
		} else if (this.cursors.down.isDown) {
			this.player.y += 4;
			this.player.anims.play("turn", true);
		}

		// 💖 Example: Reduce stamina when moving
		let hp = this.uiScene.hp;
		let stamina = this.uiScene.stamina;
		let coins = this.uiScene.coins;

		// Increase coins based on habit tracker

		// 🔄 Update UI in UIScene
		let uiScene = this.scene.get("UIScene");
		if (uiScene) {
			uiScene.updateUI(hp, stamina, coins);
		}
            
        // Check if player is in HabitTracking or Shop areas and press 'E' to open them
        if (Phaser.Geom.Rectangle.Contains(this.habitTrackingArea, this.player.x, this.player.y)) {
            console.log("On Habit Tracker");
            this.displayMessage("Press 'E' to open Habit Tracker");
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.openHabitTracking();
            }
        } else if (Phaser.Geom.Rectangle.Contains(this.shopArea, this.player.x, this.player.y)) {
            console.log("On Shop");
            this.displayMessage("Press 'E' to open Shop");
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.openShop();
            }
        } else if (Phaser.Geom.Rectangle.Contains(this.dungeonArea, this.player.x, this.player.y)) {
            console.log("On Dungeon");
            this.displayMessage("Press 'E' to enter Dungeon");
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.openDungeon();
            }
        } 
		else {
            this.hideMessage();
        }
	}
    displayMessage(text) {
        // Display a message (e.g., 'Press E to open Habit Tracker')
        if (!this.message) {
            this.message = this.add.text(this.player.x, this.player.y - 30, text, { font: "16px Arial", fill: "#fff" });
        } else {
            this.message.setText(text);
        }
    }
    hideMessage() {
        // Hide the message when the player leaves the trigger area
        if (this.message) {
            this.message.setText("");
        }
    }
    openHabitTracking() {
        // Open the Habit Tracking Scene
        console.log("Opening Habit Tracker...");
        this.scene.launch("HabitTracking");
    }
    openShop() {
        // Open the Shop Scene
        console.log("Opening Shop...");
        this.scene.launch("Shop");
    }

	//Edit later (Dungeon boss)
	openDungeon(){
		// Open Dungeon Scene
		console.log("Entering Dungeon");
		this.scene.launch("Dungeon");
	}

}
