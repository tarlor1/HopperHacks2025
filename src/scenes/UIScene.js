export class UIScene extends Phaser.Scene {
	constructor() {
		super({ key: "UIScene" });
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
		this.hpBar.clear();
		this.hpBar.fillStyle(0xff0000, 1);
		this.hpBar.fillRoundedRect(10, 10, hp * 2, 15, 5);

		this.staminaBar.clear();
		this.staminaBar.fillStyle(0x007bff, 1);
		this.staminaBar.fillRoundedRect(10, 30, stamina * 1.5, 15, 5);

		this.coinText.setText(coins);
	}
}
