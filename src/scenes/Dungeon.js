export class Dungeon extends Phaser.Scene {
    constructor() {
        super('Dungeon');
    }

    preload() {
        // Load the background image
        this.load.image('battleBackground', 'assets/PokemonBattleScene.png');
    }

    create() {

        //UI Scene
        if (!this.scene.isActive("UIScene")) {
            this.scene.launch("UIScene");
        }
        this.uiScene = this.scene.get("UIScene");

        // Example: Displaying UI values (HP, stamina, and coins)
        console.log("Player HP:", this.uiScene.hp);
        console.log("Player Stamina:", this.uiScene.stamina);
        console.log("Player Coins:", this.uiScene.coins);


        
        // Create background image
        this.background = this.add.image(1920 / 2, 1080 / 2, 'battleBackground');
        this.background.setDisplaySize(1920, 1080); // Resize to fit the screen

        // Create text-based buttons
        this.attackButton = this.add.text(1500, 900, 'Attack', { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .setOrigin(0.5, 0.5);

        this.runButton = this.add.text(1700, 900, 'Run', { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .setOrigin(0.5, 0.5);

        // Handle mouse hover over the attack button
        this.attackButton.on('pointerover', () => {
            this.attackButton.setStyle({ fill: 'red' });  // Change color to yellow on hover
            this.attackButton.setScale(1.1);  // Enlarge the button when hovered
        }).on('pointerout', () => {
            this.attackButton.setStyle({ fill: '#fff' });  // Reset color when not hovered
            this.attackButton.setScale(1);  // Reset scale when not hovered
        });

        // Handle mouse hover over the run button
        this.runButton.on('pointerover', () => {
            this.runButton.setStyle({ fill: 'red' });  // Change color to yellow on hover
            this.runButton.setScale(1.1);  // Enlarge the button when hovered
        }).on('pointerout', () => {
            this.runButton.setStyle({ fill: '#fff' });  // Reset color when not hovered
            this.runButton.setScale(1);  // Reset scale when not hovered
        });

        // Handle mouse click on the attack button
        this.attackButton.on('pointerdown', () => {
            this.handleBattleChoice('Attack');
        });

        // Handle mouse click on the run button (transition to the Game scene)
        this.runButton.on('pointerdown', () => {
            this.handleRun();
        });

        this.scene.bringToTop("UIScene");
    }

    update() {
        // Any ongoing game logic can go here
    }

    handleBattleChoice(choice) {
        // Handle the player's choice (Attack)
        console.log('Player chose:', choice);
        let attMsg = this.add.text(960, 300, "Player chose to " + choice, { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5, 0.5);

        // Destroy the message after a delay
        this.time.delayedCall(1500, () => {
            attMsg.destroy();
        });
    }

    handleRun() {
        // Transition to the Game scene when "Run" button is clicked
        console.log('Player chose to run. Transitioning to Game scene.');
        this.scene.stop('Dungeon');
        this.scene.launch('Game');
    }

    showMessage(message) {
        // Display the choice message (or any other message)
        let messageText = this.add.text(960, 500, message, { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5, 0.5);

        // Destroy the message after a delay
        this.time.delayedCall(1500, () => {
            messageText.destroy();
        });
    }


    


    

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