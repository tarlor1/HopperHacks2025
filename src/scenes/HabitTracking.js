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
    }

    update()
    {
        let promptInput = this.add.dom(1920/2, 600, 'input', {
            type: 'text',
            placeholder: 'Prompt',
            fill: "#fff", 
        });
        // todo: change text side of the input
    }
}