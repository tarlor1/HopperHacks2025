export class Login extends Phaser.Scene
{
    constructor()
    {
        super('Login');
    }

    
    preload()
    {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');
    }

    create()
    {
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');

        const logo = this.add.image(640, 200, 'logo');

        let headerText = this.add.text(1920/2-96*2, 400-96, "Log in", { fontSize: "96px", fill: "#fff" });

        // Create username input
        let usernameInput = this.add.dom(1920/2-48, 600-96, 'input', {
            type: 'text',
            placeholder: 'Username:',
            value: "test", 
            fill: "#fff"
        });

        // Create password input
        let passwordInput = this.add.dom(1920/2-48, 700-96, 'input', {
            type: 'password',
            placeholder: 'Password:',
            value: "test",
            fill: "#fff"
        });

        let createButton = this.add.text(1920/2-48, 1100-96, "Create Account", {fontSize: "48px", fill: "#fff" })
        .setInteractive()
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
        let loginButton = this.add.text(1920/2-48, 1000-96, "Login", {fontSize: "48px", fill: "#fff" })
            .setInteractive()
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
                    loginText = this.add.text(1920/2-96*2, 600, "Invalid login", { fontSize: "48px", fill: "#f00" });
                }
            });

    }

    update()
    {

    }
}

