export class Login extends Phaser.Scene
{
    constructor()
    {
        super('Login');
    }

    
    preload()
    {
        this.load.image('logo', 'assets/phaser.png');
    }

    create()
    {
        const logo = this.add.image(this.cameras.main.width/2, 200, 'logo');
        // todo: work on background
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');

        const logo = this.add.image(640, 200, 'logo');

        let headerText = this.add.text(1920/2-96*2, 400-96, "Log in", { fontSize: "96px", fill: "#fff" });

        // Create username input
        let uHeader = this.add.text(this.cameras.main.width/2, 570, "Username:", {fontSize: "32px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let usernameInput = this.add.dom(this.cameras.main.width/2, 600, 'input', {
            type: 'text',
            placeholder: 'Username:',
            value: "", 
            fill: "#000"
        }).setOrigin(0.5, 0.5);

        // Create password input
        let pHEader = this.add.text(this.cameras.main.width/2, 670, "Password:", {fontSize: "32px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let passwordInput = this.add.dom(this.cameras.main.width/2, 700, 'input', {
            type: 'password',
            placeholder: 'Password:',
            value: "",
            fill: "#000"
        }).setOrigin(0.5, 0.5);

        let createButton = this.add.text(this.cameras.main.width/2, 900, "Create Account", {fontSize: "48px", fill: "#fff" })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerover', () => {
            createButton.setStyle({ fill: "#ff0" });  
        })
        .on('pointerout', () => {
            createButton.setStyle({ fill: "#fff" });  
        })
        .on('pointerdown', () => {
            loginButton.value = "";
            headerText.value = "Create Account";
            let username = usernameInput.node.value;
            let password = passwordInput.node.value;
            if(username!="" && password!=""){
                localStorage.setItem(username, password);
            }
            usernameInput.destroy();
            passwordInput.destroy();
            this.create();
        });

        // Create login button
        let loginButton = this.add.text(this.cameras.main.width/2, 800, "Login", {fontSize: "48px", fill: "#fff" })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => {
                loginButton.setStyle({ fill: "#ff0" });  
            })
            .on('pointerout', () => {
                loginButton.setStyle({ fill: "#fff" });  
            })
            .on('pointerdown', () => {
                let username = usernameInput.node.value;
                let password = passwordInput.node.value;
                let loginText;
                if (localStorage.getItem(username) === password && username!= "" && password != "") {
                    usernameInput.destroy();
                    passwordInput.destroy();
                    loginButton.destroy();
                    this.scene.start('Game');
                } else {
                    loginText = this.add.text(this.cameras.main.width/2, 800, "Invalid login", { fontSize: "48px", fill: "#f00" });
                    loginText.setOrigin(0.5, 0.5)
                }
            });

    }

    update()
    {

    }
}

