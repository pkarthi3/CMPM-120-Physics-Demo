score = 0;
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
        score = 0;
        this.endTime = 0;
        this.prevTime = this.time.now;

        this.player = this.physics.add.image(400, 400, 'frog');
        this.player.setScale(0.05);

        this.lilypads = this.physics.add.staticGroup();
        this.lilypads.create(400, 550, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(300, 400, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(450, 250, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(200, 300, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(575, 150, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(600, 350, 'lilypad').setScale(0.1).refreshBody();
        this.lilypads.create(100, 200, 'lilypad').setScale(0.1).refreshBody();

        this.coins = this.physics.add.staticGroup();
        this.coins.create(400, 500, 'coin').setScale(0.01).refreshBody();
        this.coins.create(500, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(250, 350, 'coin').setScale(0.01).refreshBody();
        this.coins.create(325, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(100, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(600, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(400, 325, 'coin').setScale(0.01).refreshBody();
        this.coins.create(150, 125, 'coin').setScale(0.01).refreshBody();
        this.coins.create(400, 200, 'coin').setScale(0.01).refreshBody();
        this.coins.create(300, 100, 'coin').setScale(0.01).refreshBody();
        this.coins.create(450, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(650, 325, 'coin').setScale(0.01).refreshBody();
        this.coins.create(600, 50, 'coin').setScale(0.01).refreshBody();


        this.goal = this.physics.add.image(400, 50, 'goal');
        this.goal.setScale(0.1);
        this.goal.body.setSize(this.goal.body.width, this.goal.body.halfHeight);
        this.goal.body.setOffset(0, this.goal.body.height);
        this.goal.body.allowGravity = false;
        this.goal.body.setImmovable(true);

        this.physics.add.collider(this.player, this.lilypads);
        this.physics.add.collider(this.player, this.goal, () => {
            if (this.player.body.touching.down && this.player.body.y < this.goal.body.y) {
                //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
                this.scene.start('results1', { endTime: this.endTime});
            }
        });
        
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.add.text(15, 15, 'Use left/right arrow keys to move and up to jump; try to reach the goal marked with the flag while collecting as many coins as you can', { wordWrap: { width: 300 }}).setColor('#000000');
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText = this.add.text(15, 100, '').setColor('#000000');

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
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
            this.player.body.x = 400;
            this.player.body.y = 400;
            this.player.setVelocityY(0);
        }

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText.setText('Score: ' + score);
        this.endTime = this.time.now - this.prevTime;

    }

    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
    collectCoin(player, coin){
        coin.disableBody(true, true);
        score++;
    }
}

class Results1 extends Phaser.Scene {
    constructor() {
        super('results1');
    }
    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
    init(data) {
        this.finishTime = data.endTime;
    }
    preload() {}
    create() {
        this.add.text(100, 100, 'Level Complete!', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 150, 'Time: ' + Math.floor(this.finishTime/1000) + ' seconds', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 200, 'Score: ' + score, {fontSize: 40}).setColor('#000000');
        this.retry = this.add.text(100, 500, 'Retry', {fontSize: 40}).setColor('#000000');
        this.retry.setInteractive();
        this.retry.on('pointerdown', () => {
            this.scene.start('level1');
        });
        this.next = this.add.text(500, 500, 'Next Level', {fontSize: 40}).setColor('#000000');
        this.next.setInteractive();
        this.next.on('pointerdown', () => {
            this.scene.start('level2');
        });
    }
    update() {}
}

class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('frog', 'frog.png');
        this.load.image('coin', 'coin.png');
        this.load.image('lilypad', 'lilypad.png');
        this.load.image('goal', 'lilypadgoal.png');
        this.load.image('cloud', 'cloud.png');
    }
    create() {
        score = 0;
        this.endTime = 0;
        this.prevTime = this.time.now;

        this.player = this.physics.add.image(100, 500, 'frog');
        this.player.setScale(0.025);

        this.lilypads = this.physics.add.staticGroup();
        this.lilypads.create(100, 550, 'lilypad').setScale(0.05).refreshBody();
        this.lilypads.create(450, 250, 'lilypad').setScale(0.05).refreshBody();
        this.lilypads.create(600, 350, 'lilypad').setScale(0.05).refreshBody();
        this.lilypads.create(150, 150, 'lilypad').setScale(0.05).refreshBody();

        this.coins = this.physics.add.staticGroup();
        this.coins.create(500, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(200, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(600, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(400, 325, 'coin').setScale(0.01).refreshBody();
        this.coins.create(150, 125, 'coin').setScale(0.01).refreshBody();
        this.coins.create(400, 200, 'coin').setScale(0.01).refreshBody();
        this.coins.create(300, 100, 'coin').setScale(0.01).refreshBody();
        this.coins.create(450, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(650, 325, 'coin').setScale(0.01).refreshBody();
        this.coins.create(600, 50, 'coin').setScale(0.01).refreshBody();

        this.clouds = this.physics.add.staticGroup();
        this.clouds.create(200, 400, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(400, 500, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(575, 150, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(325, 300, 'cloud').setScale(0.05).refreshBody();


        this.goal = this.physics.add.image(400, 50, 'goal');
        this.goal.setScale(0.05);
        this.goal.body.setSize(this.goal.body.width, this.goal.body.halfHeight);
        this.goal.body.setOffset(0, this.goal.body.height);
        this.goal.body.allowGravity = false;
        this.goal.body.setImmovable(true);

        this.physics.add.collider(this.player, this.lilypads);
        this.physics.add.collider(this.player, this.goal, () => {
            if (this.player.body.touching.down && this.player.body.y < this.goal.body.y) {
                //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
                this.scene.start('results2', { endTime: this.endTime});
            }
        });
        
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.physics.add.collider(this.player, this.clouds, this.cloudVanish, null, this);

        this.add.text(15, 15, 'The clouds aren\'t as solid as they may look...', { wordWrap: { width: 300 }}).setColor('#000000');
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText = this.add.text(15, 100, '').setColor('#000000');

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
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
            this.player.body.y = 500;
            this.player.setVelocityY(0);
            //based on example solution found at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
            for ( let cloud of this.clouds.getChildren()) {
                cloud.enableBody(true, cloud.x, cloud.y, true, true);
            }
        }

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText.setText('Score: ' + score);
        this.endTime = this.time.now - this.prevTime;

    }

    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
    collectCoin(player, coin){
        coin.disableBody(true, true);
        score++;
    }

    cloudVanish(player, cloud){
        if (player.body.touching.down && player.body.y < cloud.body.y) {
            cloud.disableBody(true, true);
        }
    }
}

class Results2 extends Phaser.Scene {
    constructor() {
        super('results2');
    }
    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
    init(data) {
        this.finishTime = data.endTime;
    }
    preload() {}
    create() {
        this.add.text(100, 100, 'Level Complete!', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 150, 'Time: ' + Math.floor(this.finishTime/1000) + ' seconds', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 200, 'Score: ' + score, {fontSize: 40}).setColor('#000000');
        this.retry = this.add.text(100, 500, 'Retry', {fontSize: 40}).setColor('#000000');
        this.retry.setInteractive();
        this.retry.on('pointerdown', () => {
            this.scene.start('level2');
        });
        this.next = this.add.text(500, 500, 'Next Level', {fontSize: 40}).setColor('#000000');
        this.next.setInteractive();
        this.next.on('pointerdown', () => {
            this.scene.start('level3');
        })
    }
    update() {}
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('frog', 'frog.png');
        this.load.image('coin', 'coin.png');
        this.load.image('lilypad', 'lilypad.png');
        this.load.image('goal', 'lilypadgoal.png');
        this.load.image('cloud', 'cloud.png');
        this.load.image('trap', 'lilypadtrap.png');
    }
    create() {
        score = 0;
        this.endTime = 0;
        this.prevTime = this.time.now;

        this.player = this.physics.add.image(100, 500, 'frog');
        this.player.setScale(0.025);

        this.lilypads = this.physics.add.staticGroup();
        this.lilypads.create(100, 550, 'lilypad').setScale(0.05).refreshBody();

        this.traps = this.physics.add.staticGroup();
        this.traps.create(50, 300, 'trap').setScale(0.05).refreshBody();
        this.traps.create(600, 350, 'trap').setScale(0.05).refreshBody();
        this.traps.create(450, 250, 'trap').setScale(0.05).refreshBody();

        this.coins = this.physics.add.staticGroup();
        this.coins.create(200, 300, 'coin').setScale(0.01).refreshBody();
        this.coins.create(200, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(300, 250, 'coin').setScale(0.01).refreshBody();
        this.coins.create(150, 125, 'coin').setScale(0.01).refreshBody();
        this.coins.create(500, 100, 'coin').setScale(0.01).refreshBody();
        this.coins.create(300, 100, 'coin').setScale(0.01).refreshBody();
        this.coins.create(450, 150, 'coin').setScale(0.01).refreshBody();
        this.coins.create(250, 325, 'coin').setScale(0.01).refreshBody();
        this.coins.create(600, 50, 'coin').setScale(0.01).refreshBody();

        this.clouds = this.physics.add.staticGroup();
        this.clouds.create(200, 400, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(575, 150, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(325, 300, 'cloud').setScale(0.05).refreshBody();
        this.clouds.create(150, 150, 'cloud').setScale(0.05).refreshBody();


        this.goal = this.physics.add.image(400, 50, 'goal');
        this.goal.setScale(0.05);
        this.goal.body.setSize(this.goal.body.width, this.goal.body.halfHeight);
        this.goal.body.setOffset(0, this.goal.body.height);
        this.goal.body.allowGravity = false;
        this.goal.body.setImmovable(true);

        this.physics.add.collider(this.player, this.lilypads);
        this.physics.add.collider(this.player, this.goal, () => {
            if (this.player.body.touching.down && this.player.body.y < this.goal.body.y) {
                //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
                this.scene.start('results3', { endTime: this.endTime});
            }
        });

        this.physics.add.collider(this.player, this.traps, () => {
            if (this.player.body.touching.down) {
                this.player.body.x = 100;
                this.player.body.y = 500;
                this.player.setVelocityY(0);
                //based on example solution found at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
                for ( let cloud of this.clouds.getChildren()) {
                    cloud.enableBody(true, cloud.x, cloud.y, true, true);
                }
            }
        });
        
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.physics.add.collider(this.player, this.clouds, this.cloudVanish, null, this);

        this.add.text(15, 15, 'Watch out for the traps!', { wordWrap: { width: 300 }}).setColor('#000000');
        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText = this.add.text(15, 50, '').setColor('#000000');

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
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
            this.player.body.y = 500;
            this.player.setVelocityY(0);
            //based on example solution found at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
            for ( let cloud of this.clouds.getChildren()) {
                cloud.enableBody(true, cloud.x, cloud.y, true, true);
            }
        }

        //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cevents%5Clisten%20to%20game%20object%20event.js&return=phaser4-index.html%3Fpath%3Devents
        this.scoreText.setText('Score: ' + score);
        this.endTime = this.time.now - this.prevTime;

    }

    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src\physics\arcade\basic%20platform.js&return=phaser4-index.html?path=physics/arcade
    collectCoin(player, coin){
        coin.disableBody(true, true);
        score++;
    }

    cloudVanish(player, cloud){
        if (player.body.touching.down && player.body.y < cloud.body.y) {
            cloud.disableBody(true, true);
        }
    }
}

class Results3 extends Phaser.Scene {
    constructor() {
        super('results3');
    }
    //based on example solution at https://labs.phaser.io/phaser4-view.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js&return=phaser4-index.html%3Fpath%3Dscenes
    init(data) {
        this.finishTime = data.endTime;
    }
    preload() {}
    create() {
        this.add.text(100, 100, 'Level Complete!', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 150, 'Time: ' + Math.floor(this.finishTime/1000) + ' seconds', {fontSize: 40}).setColor('#000000');
        this.add.text(100, 200, 'Score: ' + score, {fontSize: 40}).setColor('#000000');
        this.retry = this.add.text(100, 500, 'Retry', {fontSize: 40}).setColor('#000000');
        this.retry.setInteractive();
        this.retry.on('pointerdown', () => {
            this.scene.start('Level3');
        });
        this.next = this.add.text(450, 500, 'Restart Game', {fontSize: 40}).setColor('#000000');
        this.next.setInteractive();
        this.next.on('pointerdown', () => {
            this.scene.start('level1');
        });
    }
    update() {}
}

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x98D5F5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false,
        }
    },
    scene: [ Level1, Results1, Level2, Results2, Level3, Results3 ]
}

let game = new Phaser.Game(config);