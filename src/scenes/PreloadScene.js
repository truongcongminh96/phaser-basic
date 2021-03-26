import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super('PreloadScene');
        this.config = config;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }
}

export default PreloadScene
