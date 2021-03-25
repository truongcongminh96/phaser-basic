import Phaser from "phaser";

class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
        this.initPosition = {
            x:80,
            y:300
        };

        this.bird = null;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
        this.bird = this.physics.add.sprite(this.initPosition.x, this.initPosition.y, 'bird').setOrigin(0);
        this.bird.body.gravity.y = 400;
    }

    update() {
    }
}

export default PlayScene