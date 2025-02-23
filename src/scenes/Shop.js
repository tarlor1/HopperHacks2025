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
        let staminaPotion = this.add.image(900, 300, 'staminaPotion');
        let healthPotion = this.add.image(900, 700, 'healthPotion');
        let itemList = [staminaPotion, healthPotion];
        let i = 0;
        let held = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            Enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        };        
        let backButton = this.add.text(1920-100, 100, "Back", {fontSize:"48px", fill:"#000"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
            this.scene.start('Game');
        })

    }

    update()
    {
        if(!held){
            if(this.cursors.up.isDown || this.cursors.up.isRight){
                i = (i+1)%(itemList.length);
                held = true;
            } else if(this.cursors.down.isDown || this.cursors.up.isLeft){
                i = (i-1)%(itemList.length);
                held = true;
            } else {
                held = false;
            }
        }
        if(this.keys.Enter.isDown){
            if(itemList[i] === staminaPotion){
                this.uiScene.updateUI(this.uiScene.hp, 100, this.uiScene.coins-10);
            }
            else if(itemList[i] === healthPotion){
                this.uiScene.updateUI(100, this.uiScene.stamina, this.uiScene.coins-20);
            }
        }
    }
}