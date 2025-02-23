export class Shop extends Phaser.Scene{
    constructor()
    {
        super('Shop');
    }

    preload()
    {
        //this.load.image('staminaPotion', 'assets/stamina_potion.png');
        //this.load.image('healthPotion', 'assets/health_potion.png');
        this.load.image('background', 'assets/wood_background.png');
        
    }

    create()
    {
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');
        let staminaPotion = this.add.image(900, 300, 'staminaPotion');
        let healthPotion = this.add.image(900, 700, 'healthPotion');
        let itemList = [staminaPotion, healthPotion];
        let i = 0;
        let held = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            Enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Enter)
        };        
        

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
                //set method for stamina
            }
            else if(itemList[i] === healthPotion){
                //set method for health
            }
        }
    }
}