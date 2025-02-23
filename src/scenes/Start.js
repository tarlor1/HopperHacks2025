export class Start extends Phaser.Scene
{
    constructor()
    {
        super('Start');
    }

    preload()
    {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/habitquest.png');
        this.load.image('button', 'assets/play_button.png'); // Load play button image
        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create()
    {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo'); // 'logo' is named in preload()

        const playButton = this.add.image(640, 500, 'button')
            .setInteractive() //make it clickable
            .setScale(0.5); //Resize if needed
        
        //On click, switch to "Game" scene
        playButton.on('pointerdown', () => {
            this.scene.start('Login');
        });

        // Hover effect (optional)
        playButton.on('pointerover', () => playButton.setScale(0.55));
        playButton.on('pointerout', () => playButton.setScale(0.5));

        const ship = this.add.sprite(640, 360, 'ship'); //'ship' is named in preload() 

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        ship.play('fly');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });
    }

    update()
    {
        this.background.tilePositionX += 2;
    }
}

