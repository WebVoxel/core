import { World, Game, Block, Point3D, Identifier } from '@webvoxel/core';
import { WASDControlsPlugin } from '@webvoxel/plugin-wasdcontrols';
import { ReachPlugin } from '@webvoxel/plugin-reach';
import { Noise } from './2dNoise';

const noise = new Noise();

const world = new World();
for (let x = 0; x < 64; x++) {
    for (let y = 0; y < 64; y++) {
        const height = Math.floor(noise.perlin2d(x / 100, y / 100) * 32);
        world.addBlock(new Block({
            coords: new Point3D(x, height, y),
            type: new Identifier("example_minecraft", "dirt"),
        }));
    }
}

const wasd = new WASDControlsPlugin();
const reach = new ReachPlugin({
    crosshair: true,
});

const game = new Game({
    plugins: [
        // @ts-ignore
        wasd,
        // @ts-ignore
        reach,
    ],
    initialWorld: world,
    textureRoot: 'https://webvoxel-assets.nyc3.digitaloceanspaces.com',
});

game.camera.position.y = 2.5;

game.start();

game.renderer.domElement.addEventListener('click', () => wasd.controls.lock());