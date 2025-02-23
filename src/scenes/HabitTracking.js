import { UIScene } from "./UIScene.js"
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

        // this.image.bringToTop("background");
        if (!this.scene.isActive("UIScene")) {
			this.scene.launch("UIScene");
		}
        this.uiScene = this.scene.get("UIScene");
        this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins);
        let goodHabitText = this.add.text(300, 200, "Good Habit", {fontSize: "48px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let badHabitText = this.add.text(1920-300, 200, "Bad Habit", {fontSize: "48px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let goodHabitInput1 = this.add.dom(300, 400, 'input').setOrigin(0.5, 0.5);
        let goodHabitInput2 = this.add.dom(300, 600, 'input').setOrigin(0.5, 0.5);
        let goodHabitInput3 = this.add.dom(300, 800, 'input').setOrigin(0.5, 0.5);
        let badHabitInput1 = this.add.dom(1920-300, 400, 'input').setOrigin(0.5, 0.5);
        let badHabitInput2 = this.add.dom(1920-300, 600, 'input').setOrigin(0.5, 0.5);
        let badHabitInput3 = this.add.dom(1920-300, 800, 'input').setOrigin(0.5, 0.5);
        if(this.uiScene){
            let goodButton1 = this.add.text(500, 400, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = goodHabitInput1.node.value;
                if(habit){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins+5);
                }
            })
            let goodButton2 = this.add.text(500, 600, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = goodHabitInput2.node.value;
                if(habit){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins+5);
                }
            })
            let goodButton3 = this.add.text(500, 800, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = goodHabitInput3.node.value;
                if(habit){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins+5);
                }
            })
            let badButton1 = this.add.text(1820, 400, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = badHabitInput1.node.value;
                if(habit){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins-5);
                }
            })
            let badButton2 = this.add.text(1820, 600, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = badHabitInput2.node.value;
                if(habit != ""){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins-5);
                }
            })
            let badButton3 = this.add.text(1820, 800, "Submit", {fontSize:"48px", fill:"#0f0"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                let habit = badHabitInput3.node.value;
                if(habit){
                    this.uiScene.updateUI(this.uiScene.hp, this.uiScene.stamina, this.uiScene.coins-5);
                }
            })
            let backButton = this.add.text(1920-100, 100, "Back", {fontSize:"48px", fill:"#fff"}).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                this.scene.stop('HabitTracking');
                this.scene.launch('Game')
            })
            this.scene.bringToTop("UIScene");
        }
    }

    update()
    {
        
    }
}