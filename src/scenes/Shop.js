import { UIScene } from "./UIScene.js";
export class Shop extends Phaser.Scene{
    constructor()
    {
        super('Shop');
    }

    preload()
    {
        this.load.image('staminaPotion', 'assets/staminapotion.png');
        this.load.image('healthPotion', 'assets/healthpotion.png');
        this.load.image('background', 'assets/wood_background.png');
        
    }

    create()
    {
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');
        if (!this.scene.isActive("UIScene")) {
			this.scene.launch("UIScene");
		}
        this.uiScene = this.scene.get("UIScene");
        let staminaPotion = this.add.image(900, 300, 'staminaPotion').setInteractive().on('pointerdown', () => {
            this.uiScene.updateUI(this.uiScene.hp, 100, this.uiScene.coins-10)
        });
        let healthPotion = this.add.image(900, 700, 'healthPotion').setInteractive().on('pointerdown', () => {
            this.uiScene.updateUI(100, this.uiScene.stamina, this.uiScene.coins-20)
        });    
        let backButton = this.add.text(1920-100, 100, "Back", {fontSize:"48px", fill:"#fff"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
            this.scene.stop('Shop');
            this.scene.launch('Game')
        })
    }

    update()
    {
        
    }
}