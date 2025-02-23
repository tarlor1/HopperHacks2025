export class Game extends Phaser.Scene {
	constructor() {
		var player;
		var cursors;
		super("Game");
	}

	preload() {
		this.load.spritesheet("dude", "assets/dude.png", {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	create() {
		this.add
			.text(640, 360, "Game Scene!", {
				fontSize: "32px",
				fill: "#fff",
			})
			.setOrigin(0.5);

		this.player = this.add.sprite(100, 450, "dude");
		this.cursors = this.input.keyboard.createCursorKeys();
		this.cameras.main.startFollow(this.player);

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 0,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
			createUI() {
				// 🟠 Background Panel
				this.uiContainer = this.add.container(20, 20); // Position relative to screen

				let panel = this.add.graphics();
				panel.fillStyle(0x222222, 0.8); // Dark transparent background
				panel.fillRoundedRect(0, 0, 250, 80, 10);

				// ❤️ HP Bar
				this.hpBar = this.add.graphics();
				this.hpBar.fillStyle(0xff0000, 1);
				this.hpBar.fillRoundedRect(10, 10, 200, 15, 5);

				// 🔵 Stamina Bar
				this.staminaBar = this.add.graphics();
				this.staminaBar.fillStyle(0x007bff, 1);
				this.staminaBar.fillRoundedRect(10, 30, 150, 15, 5); // Initial stamina bar width

				// 🏅 Coins Display
				this.coinIcon = this.add.text(10, 55, "💰", {
					fontSize: "18px",
				});
				this.coinText = this.add.text(40, 55, "0", {
					fontSize: "18px",
					fill: "#fff",
				});

				// 📌 Add everything to the UI Container
				this.uiContainer.add([
					panel,
					this.hpBar,
					this.staminaBar,
					this.coinIcon,
					this.coinText,
				]);

				// 🚀 FIX UI TO CAMERA
				this.uiContainer.setScrollFactor(0); // Ensures UI stays on screen
			},
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

		// 🟢 ADD UI ELEMENTS
		this.createUI();
	}

	// 📌 Create UI Container
	createUI() {
		// 🟠 Background Panel
		this.uiContainer = this.add.container(20, 20); // Position relative to screen

		let panel = this.add.graphics();
		panel.fillStyle(0x222222, 0.8); // Dark transparent background
		panel.fillRoundedRect(0, 0, 250, 80, 10);

		// ❤️ HP Bar
		this.hpBar = this.add.graphics();
		this.hpBar.fillStyle(0xff0000, 1);
		this.hpBar.fillRoundedRect(10, 10, 200, 15, 5);

		// 🔵 Stamina Bar
		this.staminaBar = this.add.graphics();
		this.staminaBar.fillStyle(0x007bff, 1);
		this.staminaBar.fillRoundedRect(10, 30, 150, 15, 5); // Initial stamina bar width

		// 🏅 Coins Display
		this.coinIcon = this.add.text(10, 55, "💰", { fontSize: "18px" });
		this.coinText = this.add.text(40, 55, "0", {
			fontSize: "18px",
			fill: "#fff",
		});

		// 📌 Add everything to the UI Container
		this.uiContainer.add([
			panel,
			this.hpBar,
			this.staminaBar,
			this.coinIcon,
			this.coinText,
		]);

		// 🚀 FIX UI TO CAMERA
		this.uiContainer.setScrollFactor(0); // Ensures UI stays on screen
	}

	// 🔄 Update UI Values
	updateUI(hp, stamina, coins) {
		this.hpBar.clear();
		this.hpBar.fillStyle(0xff0000, 1);
		this.hpBar.fillRoundedRect(10, 10, hp * 2, 15, 5); // Scale HP bar width

		this.staminaBar.clear();
		this.staminaBar.fillStyle(0x007bff, 1);
		this.staminaBar.fillRoundedRect(10, 30, stamina * 1.5, 15, 5); // Scale stamina bar width

		this.coinText.setText(coins);
	}

	update() {
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

		// 💖 Example: Reduce Stamina when moving
		let stamina = Math.max(0, 100 - this.player.y / 5);
		let coins = Math.floor(this.player.x / 50); // Increase coins based on movement

		this.updateUI(100, stamina, coins);
	}
}
