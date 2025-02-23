export class Login extends Phaser.Scene
{
    constructor()
    {
        super('Login');
    }

    
    preload()
    {
        //this.load.image('logo', 'assets/phaser.png');
    }

    create()
    {
        let loginText;
        let createAccText;
        
        const logo = this.add.image(this.cameras.main.width/2, 200, 'logo');
        // todo: work on background
        this.background = this.add.tileSprite(1920/2, 1080/2, 1920, 1080, 'background');

        let headerText = this.add.text(1920/2-96*2, 400-96, "Log in", { fontSize: "96px", fill: "#fff" });

        // Create username input
        let uHeader = this.add.text(this.cameras.main.width/2, 570, "Username:", {fontSize: "24px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let usernameInput = this.add.dom(this.cameras.main.width/2, 600, 'input').setOrigin(0.5, 0.5);

        // Create password input
        let pHEader = this.add.text(this.cameras.main.width/2, 670, "Password:", {fontSize: "24px", fill: "#fff"}).setOrigin(0.5, 0.5);
        let passwordInput = this.add.dom(this.cameras.main.width/2, 700, 'input').setOrigin(0.5, 0.5);

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
            let username = usernameInput.node.value;
            let password = passwordInput.node.value;
            if(username!="" && password!=""){
                localStorage.setItem(username, password);
            }
            if(loginText){
                loginText.destroy();
            }
            createAccText = this.add.text(this.cameras.main.width/2, 750, "Account Successfully Created", { fontSize: "24px", fill: "green" }).setOrigin(0.5, 0.5);
            this.time.delayedCall(1000, () => {
                createAccText.destroy();
            });
            usernameInput.destroy();
            passwordInput.destroy();
            usernameInput = this.add.dom(this.cameras.main.width/2, 600, 'input').setOrigin(0.5, 0.5);
            passwordInput = this.add.dom(this.cameras.main.width/2, 700, 'input').setOrigin(0.5, 0.5);
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
                if (localStorage.getItem(username) === password && username!= "" && password != "") {
                    usernameInput.destroy();
                    passwordInput.destroy();
                    loginButton.destroy();
                    this.scene.start('Game');
                } else {
                    if(createAccText){
                        createAccText.destroy();
                    }
                    loginText = this.add.text(this.cameras.main.width/2, 750, "Invalid Login", { fontSize: "24px", fill: "#f00" }).setOrigin(0.5, 0.5);
                    this.time.delayedCall(1000, () => {
                        loginText.destroy();
                    });
                }
            });

    }

    update()
    {

    }
}

