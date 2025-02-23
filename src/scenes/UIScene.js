export class UIScene extends Phaser.Scene {
	constructor() {
		super({ key: "UIScene" });

		this._hp = 100;
		this._stamina = 100;
		this._coins = 0;
	}

	create() {
		// 🚀 UI Container (Fixed to Camera)
		this.uiContainer = this.add.container(20, 20);

		let panel = this.add.graphics();
		panel.fillStyle(0x222222, 0.8); // Dark semi-transparent background
		panel.fillRoundedRect(0, 0, 250, 80, 10);

		// ❤️ HP Bar
		this.hpBar = this.add.graphics();
		this.hpBar.fillStyle(0xff0000, 1);
		this.hpBar.fillRoundedRect(10, 10, 200, 15, 5);

		// 🔵 Stamina Bar
		this.staminaBar = this.add.graphics();
		this.staminaBar.fillStyle(0x007bff, 1);
		this.staminaBar.fillRoundedRect(10, 30, 150, 15, 5);

		// 🏅 Coins Display
		this.coinIcon = this.add.text(10, 55, "💰", { fontSize: "18px" });
		this.coinText = this.add.text(40, 55, "0", {
			fontSize: "18px",
			fill: "#fff",
		});

		// 📌 Add UI elements to the container
		this.uiContainer.add([
			panel,
			this.hpBar,
			this.staminaBar,
			this.coinIcon,
			this.coinText,
		]);

		// 🚀 FIX UI TO CAMERA
		this.uiContainer.setScrollFactor(0);
	}

	// 🔄 Update UI globally
	updateUI(hp, stamina, coins) {
		this.hp = hp;
		this.hpBar.clear();
		this.hpBar.fillStyle(0xff0000, 1);
		this.hpBar.fillRoundedRect(10, 10, hp * 2, 15, 5);

		this.stamina = stamina;
		this.staminaBar.clear();
		this.staminaBar.fillStyle(0x007bff, 1);
		this.staminaBar.fillRoundedRect(10, 30, stamina * 1.5, 15, 5);

		this.coins = coins;
		this.coinText.setText(coins);
	}

	updateHP() {
		this.hpBar.clear();
		this.hpBar.fillStyle(0xff0000, 1);
	}

	// Getter methods
	get hp() {
		return this._hp;
	}

	get stamina() {
		return this._stamina;
	}

	get coins() {
		return this._coins;
	}

	// Setter methods (if needed)
	set hp(value) {
		this._hp = value;
	}

	set stamina(value) {
		this._stamina = value;
	}

	set coins(value) {
		this._coins = value;
	}
}
