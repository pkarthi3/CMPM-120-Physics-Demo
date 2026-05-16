class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('frog', 'frog.png');
        this.load.image('coin', 'coin.png');
        this.load.image('lilypad', 'lilypad.png');
        this.load.image('goal', 'lilypadgoal.png');
    }
    create() {
        this.player = this.physics.add.image(100, 100, 'frog');
        this.player.setScale(0.05);
        this.lilypads = this.physics.add.staticGroup();
        this.lilypads.create(100, 550, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(300, 400, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(400, 250, 'lilypad').setScale(0.1).refreshBody();
        this.goal = this.physics.add.image(500, 0, 'goal');
        this.goal.setScale(0.1);
        this.goal.body.allowGravity = false;

        this.physics.add.collider(this.player, this.lilypads);

        //based on example solution on labs.phaser.io
        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {

        //based on example solution on labs.phaser.io
        const { left, right, up } = this.cursors;
        if (left.isDown) {
            this.player.setVelocityX(-100);
        }
        else if (right.isDown) {
            this.player.setVelocityX(100);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }

        if (this.player.body.y > 700) {
            this.player.body.x = 100;
            this.player.body.y = 450;
            this.player.setVelocityY(0);
        }
    }
}

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x98D5F5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 150 },
            debug: true,
        }
    },
    scene: [ Level1 ]
}

let game = new Phaser.Game(config);