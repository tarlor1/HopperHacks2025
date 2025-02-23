export class Game extends Phaser.Scene {
	constructor() {
		super("Game");
	}

	create() {
		this.add
			.text(640, 360, "Game Scene!", {
				fontSize: "32px",
				fill: "#fff",
			})
			.setOrigin(0.5);
	}
}
