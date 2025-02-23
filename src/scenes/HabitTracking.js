export class HabitTracking extends Phaser.Scene
{
    constructor()
    {
        super('HabitTracking');
    }

    preload()
    {
        // load sprite?
        this.load.image('background', 'assets/wood_background.png');
        
    }

    create()
    {
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');
        let goodHabitText = this.add.text(300, 200, "Good Habit", {fontSize: "48px", fill: "#000"}).setOrigin(0.5, 0.5);
        let badHabitText = this.add.text(1920-300, 200, "Bad Habit", {fontSize: "48px", fill: "#000"}).setOrigin(0.5, 0.5);
        let goodHabitInput = this.add.dom(300, 400, 'input').setOrigin(0.5, 0.5);
        let badHabitInput = this.add.dom(1920-300, 400, 'input').setOrigin(0.5, 0.5);
        let submitButton = this.add.text(1920/2, 800, "Submit", {fontSize:"48px", fill:"#0f0"}).setInteractive().on('pointerdown', () => {
            let goodHabit = goodHabitInput.node.value;
            let badHabit = badHabitInput.node.value;
            if(goodHabit){
                this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins+5);
            } else if(badHabit){
                this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins-5);
            }
        })
    }

    update()
    {
        
    }
}