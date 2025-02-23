export class Dungeon extends Phaser.Scene {
    constructor() {
        super('Dungeon');
        this.bossHP = 100;  // Boss's starting HP
        this.bossMaxHP = 100; // For reference in UI
        this.bossRegenerationAmount = 50; // Amount of HP the boss will regain after being defeated
    }

    preload() {
        // Load assets
        this.load.image('battleBackground', 'assets/PokemonBattleScene.png');
        this.load.image('boss1', 'assets/boss1.png');
    }

    create() {
        // Launch UI Scene if not active
        if (!this.scene.isActive("UIScene")) {
            this.scene.launch("UIScene");
        }
        this.uiScene = this.scene.get("UIScene");

        // Background
        this.background = this.add.image(1920 / 2, 1080 / 2, 'battleBackground');
        this.background.setDisplaySize(1920, 1080);

        // Add boss sprite in the center
        this.boss = this.add.image(1500, 400, 'boss1'); 
        this.boss.setScale(0.5); // Adjust size as needed

        // Boss Health Bar (Elden Ring Style)
        this.bossHealthBarBg = this.add.rectangle(960, 80, 600, 20, 0x333333); // Background bar
        this.bossHealthBar = this.add.rectangle(960, 80, 600, 20, 0xff0000); // Red HP bar
        this.bossHealthText = this.add.text(960, 50, `Boss HP: ${this.bossHP}/${this.bossMaxHP}`, 
            { fontSize: '24px', fill: '#fff' }).setOrigin(0.5, 0.5);

        // Buttons
        this.attackButton = this.createButton(1500, 900, 'Attack', () => this.handleAttack());
        this.runButton = this.createButton(1700, 900, 'Run', () => this.handleRun());

        this.scene.bringToTop("UIScene");
    }

    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .setOrigin(0.5, 0.5);

        button.on('pointerover', () => {
            button.setStyle({ fill: 'red' }).setScale(1.1);
        }).on('pointerout', () => {
            button.setStyle({ fill: '#fff' }).setScale(1);
        }).on('pointerdown', callback);

        return button;
    }

    handleAttack() {
        let playerHP = this.uiScene.hp;

        if (this.bossHP > 0 && playerHP > 0) {
            // Player attacks
            this.bossHP -= 20;
            this.showMessage("You attacked! -20 HP to Boss");

            // Update boss HP UI
            this.updateBossHealthUI();

            if (this.bossHP > 0) {
                // Boss attacks back
                this.time.delayedCall(1000, () => {
                    this.uiScene.hp -= 20;
                    this.showMessage("Boss attacked back! -20 HP to You");

                    // Update UI Scene
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins);

                    // Check if player is dead
                    if (this.uiScene.hp <= 0) {
                        // Reset coins to 0 when the player dies
                        this.uiScene.coins = 0;

                        this.showMessage("You were defeated! Coins lost.");

                        // Give player 100 HP back
                        this.uiScene.hp = 100;
                        this.showMessage("You were revived with 100 HP!");

                        this.time.delayedCall(2000, () => {
                            this.scene.stop('Dungeon');
                            this.scene.start('Game'); // Or restart battle
                        });
                    }
                });
            } else {
                this.showMessage("Boss Defeated!");
                
                // Add 3 coins to the player when the boss is defeated
                this.uiScene.coins += 3;
                this.showMessage("You earned 3 coins!");

                this.time.delayedCall(2000, () => {
                    // Boss regains health after a delay
                    this.bossHP = this.bossMaxHP + this.bossRegenerationAmount; // Add regeneration to the boss's HP
                    this.showMessage("Boss regained health and is back!");

                    // Update boss health UI again
                    this.updateBossHealthUI();

                    // Allow the player to continue battling
                });
            }
        }
    }

    handleRun() {
        this.showMessage('You ran away!');
        this.scene.stop('Dungeon');
        this.scene.start('Game');
    }

    showMessage(message) {
        let messageText = this.add.text(960, 500, message, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
        this.time.delayedCall(1500, () => messageText.destroy());
    }

    updateBossHealthUI() {
        let bossHPPercentage = this.bossHP / this.bossMaxHP;
        this.bossHealthBar.setScale(bossHPPercentage, 1);
        this.bossHealthText.setText(`Boss HP: ${this.bossHP}/${this.bossMaxHP}`);
    }
}
// export class Dungeon extends Phaser.Scene {
//     constructor() {
//         super('Dungeon');
//         this.bossHP = 100;  // Boss's starting HP
//         this.bossMaxHP = 100; // For reference in UI
//     }

//     preload() {
//         // Load assets
//         this.load.image('battleBackground', 'assets/PokemonBattleScene.png');
//         this.load.image('boss1', 'assets/boss1.png');
//     }

//     create() {
//         // Launch UI Scene if not active
//         if (!this.scene.isActive("UIScene")) {
//             this.scene.launch("UIScene");
//         }
//         this.uiScene = this.scene.get("UIScene");

//         // Background
//         this.background = this.add.image(1920 / 2, 1080 / 2, 'battleBackground');
//         this.background.setDisplaySize(1920, 1080);


//         // Add boss sprite in the center
//         this.boss = this.add.image(1500, 400, 'boss1'); 
//         this.boss.setScale(0.5); // Adjust size as needed

//         // Boss Health Bar (Elden Ring Style)
//         this.bossHealthBarBg = this.add.rectangle(960, 80, 600, 20, 0x333333); // Background bar
//         this.bossHealthBar = this.add.rectangle(960, 80, 600, 20, 0xff0000); // Red HP bar
//         this.bossHealthText = this.add.text(960, 50, `Boss HP: ${this.bossHP}/${this.bossMaxHP}`, 
//             { fontSize: '24px', fill: '#fff' }).setOrigin(0.5, 0.5);

//         // Buttons
//         this.attackButton = this.createButton(1500, 900, 'Attack', () => this.handleAttack());
//         this.runButton = this.createButton(1700, 900, 'Run', () => this.handleRun());

//         this.scene.bringToTop("UIScene");
//     }

//     createButton(x, y, text, callback) {
//         let button = this.add.text(x, y, text, { fontSize: '32px', fill: '#fff' })
//             .setInteractive()
//             .setOrigin(0.5, 0.5);

//         button.on('pointerover', () => {
//             button.setStyle({ fill: 'red' }).setScale(1.1);
//         }).on('pointerout', () => {
//             button.setStyle({ fill: '#fff' }).setScale(1);
//         }).on('pointerdown', callback);

//         return button;
//     }

//     handleAttack() {
//         let playerHP = this.uiScene.hp;

//         if (this.bossHP > 0 && playerHP > 0) {
//             // Player attacks
//             this.bossHP -= 20;
//             this.showMessage("You attacked! -20 HP to Boss");

//             // Update boss HP UI
//             this.updateBossHealthUI();

//             if (this.bossHP > 0) {
//                 // Boss attacks back
//                 this.time.delayedCall(1000, () => {
//                     this.uiScene.hp -= 20;
//                     this.showMessage("Boss attacked back! -20 HP to You");

//                     // Update UI Scene
//                     this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins);

//                     // Check if player is dead
//                     if (this.uiScene.hp <= 0) {
//                         this.showMessage("You were defeated!");
//                         this.time.delayedCall(2000, () => {
//                             this.scene.stop('Dungeon');
//                             this.scene.start('Game'); // Or restart battle
//                         });
//                     }
//                 });
//             } else {
//                 this.showMessage("Boss Defeated!");
//                 this.time.delayedCall(2000, () => {
//                     this.scene.stop('Dungeon');
//                     this.scene.start('Game'); // Or reward player
//                 });
//             }
//         }
//     }

//     handleRun() {
//         this.showMessage('You ran away!');
//         this.scene.stop('Dungeon');
//         this.scene.start('Game');
//     }

//     showMessage(message) {
//         let messageText = this.add.text(960, 500, message, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
//         this.time.delayedCall(1500, () => messageText.destroy());
//     }

//     updateBossHealthUI() {
//         let bossHPPercentage = this.bossHP / this.bossMaxHP;
//         this.bossHealthBar.setScale(bossHPPercentage, 1);
//         this.bossHealthText.setText(`Boss HP: ${this.bossHP}/${this.bossMaxHP}`);
//     }
// }


