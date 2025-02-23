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
    }

    update()
    {
        // todo: change text side of the input
    }
}