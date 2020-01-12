import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';

export class Game {
	public plugins: Map<string, Plugin> = new Map<string, Plugin>();
	private readonly _renderer?: THREE.WebGLRenderer;
	public readonly camera: THREE.PerspectiveCamera;
	public currentWorld: World;

	constructor(options: IGameOptions) {
		this.currentWorld = options.initialWorld;
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

		const canvas = document.createElement('canvas');
		const context = <WebGL2RenderingContext>canvas.getContext('webgl2', { antialias: false, xrCompatible: true });

		this._renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			context: context
		});

		if (options.plugins) {
			for (const plugin of options.plugins) {
				plugin.setGame(this);
				plugin.init();
				this.plugins.set(plugin.name, plugin);
			}
		}

		this.animate = this.animate.bind(this);
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
		this._renderer.setAnimationLoop(this.animate);

		this.currentWorld.animate();

		this.dispatchEventToAllPlugins('animate');

		this.renderer.render(this.currentWorld.scene, this.camera);
	};

	public start(): void {
		this.dispatchEventToAllPlugins('before_load');
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this._renderer.domElement);

		this.currentWorld.render();

		this.animate();
		this.dispatchEventToAllPlugins('load');
	}

	get renderer(): THREE.WebGLRenderer {
		return this._renderer || (null as any as THREE.WebGLRenderer);
	}
}
