import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

interface ControlDirections {
	moveForward: boolean;
	moveBackward: boolean;
	moveLeft: boolean;
	moveRight: boolean;

	velocity: THREE.Vector3;
	direction: THREE.Vector3;
	prevTime: number;
}

export class Game {
	public plugins: Map<string, Plugin> = new Map<string, Plugin>();
	private _renderer?: THREE.WebGLRenderer;
	public readonly camera: THREE.PerspectiveCamera;
	public currentWorld: World;
	public controls: PointerLockControls;
	private controlDirections: ControlDirections = {moveBackward: false, moveForward: false, moveLeft: false, moveRight: false, velocity: new THREE.Vector3(), direction: new THREE.Vector3(), prevTime: performance.now()}

	constructor(options: IGameOptions) {
		this.currentWorld = options.initialWorld;
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.controls = new PointerLockControls(this.camera, document.body);
		
		if (options.plugins)
			for (const plugin of options.plugins)
				this.plugins.set(plugin.name, plugin);
		
		this.animate = this.animate.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	private dispatchEventToAllPlugins(eventName: string, data?: any): void {
		this.plugins.forEach((plugin: Plugin, name: string) => {
			plugin.dispatch(eventName, data);
		});
	}

	public getPlugin(name: string): Plugin {
		return this.plugins.get(name);
	}

	private animate(): void {
		requestAnimationFrame(this.animate);

		this.currentWorld.animate();

		this.dispatchEventToAllPlugins('animate');

		var time = performance.now();
		var delta = ( time - this.controlDirections.prevTime ) / 1000;
		this.controlDirections.velocity.x -= this.controlDirections.velocity.x * 10.0 * delta;
		this.controlDirections.velocity.z -= this.controlDirections.velocity.z * 10.0 * delta;

		this.controlDirections.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		this.controlDirections.direction.z = Number(this.controlDirections.moveForward) - Number(this.controlDirections.moveBackward);
		this.controlDirections.direction.x = Number(this.controlDirections.moveRight) - Number(this.controlDirections.moveLeft);
		this.controlDirections.direction.normalize(); // this ensures consistent movements in all directions

		if (this.controlDirections.moveForward || this.controlDirections.moveBackward) this.controlDirections.velocity.z -= this.controlDirections.direction.z * 400.0 * delta;
		if (this.controlDirections.moveLeft || this.controlDirections.moveRight) this.controlDirections.velocity.x -= this.controlDirections.direction.x * 400.0 * delta;

		this.controlDirections.velocity.y = Math.max(0, this.controlDirections.velocity.y);

		this.controls.moveRight( - this.controlDirections.velocity.x * delta );
		this.controls.moveForward( - this.controlDirections.velocity.z * delta );

		this._renderer!.render(this.currentWorld.scene, this.camera);

		this.controlDirections.prevTime = time;
	};

	public start(): void {
		this._renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this._renderer.domElement);

		this.currentWorld.render();

		//Controls
		this.currentWorld.scene.add(this.controls.getObject());
		document.addEventListener('keydown', this.onKeyDown, false);
		document.addEventListener('keyup', this.onKeyUp, false);
		
		this.animate();
		this.dispatchEventToAllPlugins('load');
	}

	get renderer(): THREE.WebGLRenderer {
		return this._renderer || (null as any as THREE.WebGLRenderer);
	}

	private onKeyDown(event: KeyboardEvent): void {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				this.controlDirections.moveForward = true;
				break;
			case 37: // left
			case 65: // a
				this.controlDirections.moveLeft = true;
				break;
			case 40: // down
			case 83: // s
				this.controlDirections.moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				this.controlDirections.moveRight = true;
				break;

			// case 32: // space
			// 	if ( canJump === true ) velocity.y += 350;
			// 	canJump = false;
			// 	break;
		}

	};

	onKeyUp(event: KeyboardEvent): void {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				this.controlDirections.moveForward = false;
				break;
			case 37: // left
			case 65: // a
				this.controlDirections.moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				this.controlDirections.moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				this.controlDirections.moveRight = false;
				break;
		}
	};
}