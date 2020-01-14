import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';

export class Game {
	public plugins: Map<string, Plugin> = new Map<string, Plugin>();
	private readonly _renderer: THREE.WebGLRenderer;
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
				if (plugin.dependencies && plugin.dependencies.length > 0)
					for (const dep of plugin.dependencies)
						if (this.getPlugin(dep) === null) throw new Error(`Missing plugin dependency: ${dep}`);
				plugin.setGame(this);
				plugin.init();
				this.plugins.set(plugin.name, plugin);
			}
		}

		this.animate = this.animate.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private dispatchEventToAllPlugins(eventName: string, data?: any): void {
		this.plugins.forEach((plugin: Plugin, name: string) => {
			plugin.dispatch(eventName, data);
		});
	}

	public getPlugin(name: string): Plugin | null {
		if (!this.plugins.has(name)) return null;
		return this.plugins.get(name)!;
	}

	private animate(): void {
		this._renderer.setAnimationLoop(this.animate);

		this.currentWorld.animate();

		this.dispatchEventToAllPlugins('animate');

		this.renderer.render(this.currentWorld.scene, this.camera);
	};

	private onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}


	public start(): void {
		this.dispatchEventToAllPlugins('before_load');
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener('resize', this.onWindowResize, false);
		document.body.appendChild(this._renderer.domElement);

		this.currentWorld.render();

		this.animate();
		this.dispatchEventToAllPlugins('load');
	}

	get renderer(): THREE.WebGLRenderer {
		return this._renderer || (null as any as THREE.WebGLRenderer);
	}
}
