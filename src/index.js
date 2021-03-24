import Phaser from "phaser";

const config = {
    // WebGL (Web graphics library)
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin, manages physics simulation
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: {
        preload,
        create,
        update,
    }
};

new Phaser.Game(config);

const VELOCITY = 200;
let bird = null;
let upperPipe = null;
let lowerPipe = null;

let pipeVerticalOpeningDistanceRange = [150, 250];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalOpeningDistanceRange);
let piperVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

const flapVelocity = 150;
const initPosition = {x: config.width * 0.1, y: config.height / 2};

// Loading assets, such as images, music, animations,...
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
}

function create() {
    this.add.image(0, 0, 'sky').setOrigin(0);
    bird = this.physics.add.sprite(initPosition.x, initPosition.y, 'bird').setOrigin(0);
    bird.body.gravity.y = 400;
    upperPipe = this.physics.add.sprite(400, piperVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerPipe = this.physics.add.sprite(400, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);
    this.input.on('pointerdown', flap);

    this.input.keyboard.on('keyup', flap);
}

// if bird position x is same or larger than width of canvas go back to left
// if bird position x is smaller or equal to 0 then move back the right
function update(time, delta) {
    if (bird.y > config.height || bird.y < 0 - bird.height) {
        restartBirdPosition();
    }
}

function restartBirdPosition() {
    bird.x = initPosition.x;
    bird.y = initPosition.y;
    bird.body.velocity.y = 0;
}

function flap() {
    bird.body.velocity.y = -flapVelocity;
}
