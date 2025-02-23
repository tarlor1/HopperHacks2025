export class Dungeon extends Phaser.Scene
{
    constructor()
    {
        super('Dungeon');
    }

    preload()
    {
        // load sprite?
        this.load.image('battleBackground', 'assets/PokemonBattleScene.png');
        
    }

    create()
    {
        this.background = this.add.image(1920 / 2, 1080 / 2, 'battleBackground');
        this.background.setDisplaySize(1920, 1080); // Resize to fit the screen
        //UI Scene
        if (!this.scene.isActive("UIScene")) {
			this.scene.launch("UIScene");
		}
		this.uiScene = this.scene.get("UIScene");

		// Example: Displaying UI values (HP, stamina, and coins)
		console.log("Player HP:", this.uiScene.hp);
		console.log("Player Stamina:", this.uiScene.stamina);
		console.log("Player Coins:", this.uiScene.coins);


        this.scene.bringToTop("UIScene");


    }

    update()
    {
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
        // todo: change text side of the input
    }
}