import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';

export class Game {
	private readonly rootElement: HTMLElement;
	private plugins: Map<string, Plugin> = new Map<string, Plugin>();
	private _renderer?: THREE.WebGLRenderer;
	private readonly camera: THREE.PerspectiveCamera;
	public currentWorld: World;

	constructor(options: IGameOptions) {
		this.rootElement = options.rootElement || document.body;
		this.currentWorld = options.initialWorld;
		this.camera = new THREE.PerspectiveCamera(45, this.rootElement.clientWidth / this.rootElement.clientHeight, 0.1, 1000);

		if (options.plugins)
			for (const plugin of options.plugins)
				this.plugins.set(plugin.name, plugin);
	}

	private dispatchEventToAllPlugins(eventName: string, data?: any): void {
		this.plugins.forEach((plugin, name: string) => {
			plugin.dispatch(eventName, data);
		});
	}

	private animate = (): void => {
		requestAnimationFrame(this.animate);

		this._renderer!.render(this.currentWorld.scene, this.camera);
	};

	public start(): void {
		this._renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this._renderer.setSize(this.rootElement.clientWidth, this.rootElement.clientHeight);
		this.rootElement.appendChild(this._renderer.domElement);
		this.currentWorld.scene.background = new THREE.Color(0x87ceeb);

		this.currentWorld.render();
		
		this.animate();

		this.dispatchEventToAllPlugins('load');

	}

	get renderer(): THREE.WebGLRenderer {
		return this._renderer || (null as any as THREE.WebGLRenderer);
	}
}