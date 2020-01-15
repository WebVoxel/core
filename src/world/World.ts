import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
import { IWorldData } from './IWorldData';
import { Mesh, Scene, Color, MeshStandardMaterial, BoxBufferGeometry, TextureLoader, Texture, NearestFilter, DirectionalLight, Light, DoubleSide, MeshLambertMaterial, AmbientLight, sRGBEncoding } from 'three';
import _ from 'lodash'
import { Game } from '../Game';
import { IJsonable } from '../util/IJsonable';

/**
 * Remove an item from an array
 * @param arr The array to remove the item from
 * @param toRemove The item to remove
 */
function removeItemFromArray<T>(arr: T[], toRemove: T): T[] {
	for(var i = 0; i < arr.length; i++) 
		if (_.isEqual(arr[i], toRemove))
			arr.splice(i, 1);
	return arr;
}

/**
 * An in game world.
 * @author RailRunner16
 */
export class World implements IJsonable {
	public static MISSING_TEXTURE: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEklEQVQYGWNgYGD4z/AdjBkYABuSA+36eM/zAAAAAElFTkSuQmCC';
	public scene: Scene;
	public blocks: Map<string, Block> = new Map<string, Block>();
	public blockMeshes: Map<string, Mesh> = new Map();
	private skyColor: Color = new Color(0x87ceeb);
	private light?: Light;
	private game?: Game;

	/**
	 * Create a new world.
	 * @param {IWorldData} data The world data to start with. Optional
	 */
	constructor(data?: IWorldData) {
		this.scene = new Scene();

		if (data) {
			for (const blockData of data.blocks) {
				const b = new Block(blockData);
				this.blocks.set(World.formatListKey(b.coords), b);
			}

			if (data.skyColor) this.skyColor = new Color().setRGB(data.skyColor.red, data.skyColor.green, data.skyColor.blue);
		}
	}

	/**
	 * Applies a game to the world. For internal use only.
	 * @param game The game to apply
	 */
	public setGame(game: Game): void {
		this.game = game;
	}

	/**
	 * Format a key for the map of blocks.
	 * @param {Point3D} position The position of the block in the world.
	 */
	protected static formatListKey(position: Point3D): string {
		return `${position.x}/${position.y}/${position.z}`;
	}

	/**
	 * Add a block.
	 * @param {Block} b The block to add.
	 */
	public addBlock(b: Block): void {
		const listKey = World.formatListKey(b.coords);
		if (this.blocks.has(listKey)) throw new Error(`A block already exists at position: ${listKey}.`);
		this.blocks.set(listKey, b);
	}

	/**
	 * Get a block at the specified position in the world
	 * @param {Point3D} position The position of the block to get
	 */
	public getBlock(position: Point3D): Block | undefined {
		return this.blocks.get(World.formatListKey(position));
	}

	/**
	 * The render method of the world. Never call this manually, as it is called internally by {@link Game}'s render method.
	 */
	public render(): void {
		this.blocks.forEach((b: Block, keyCoords: string) => {
			const textureLoader = new TextureLoader();
			let texture: Texture;

			if (this.game!.textureRoot) texture = textureLoader.load(`${this.game!.textureRoot}/${b.type.namespace}/textures/block/${b.type.key}.png`);
			else texture = textureLoader.load(World.MISSING_TEXTURE);

			texture.magFilter = NearestFilter;
			texture.encoding = sRGBEncoding;

			const geometry = new BoxBufferGeometry(1, 1, 1);
			const material = new MeshLambertMaterial({
				map: texture,
			});

			const blockMesh = new Mesh(geometry, material);
			this.scene.add(blockMesh);
			this.blockMeshes.set(keyCoords, blockMesh)

			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});

		const ambientLight = new AmbientLight(0x808080);
		this.scene.add(ambientLight);

		this.light = new DirectionalLight(0xffffff, 2);
		this.light.position.set(1, 1, 0.5).normalize();
		this.scene.add(this.light);
	}

	/**
	 * Set the sky color of the worlda
	 * @param {Color} skyColor The new sky color
	 */
	setSkyColor(skyColor: THREE.Color): void {
		this.skyColor = skyColor;
	}

	/**
	 * The animation loop of the world. Never call this manually, it is called internally by {@link Game}'s animation loop.
	 */
	public animate(): void {
		this.scene.background = this.skyColor;
		this.light!.color = this.skyColor;

		this.blocks.forEach((b: Block, listKey: string) => {
			if (!this.blockMeshes.has(listKey)) return;
			const blockMesh = this.blockMeshes.get(listKey)!;
			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});

		this.blockMeshes.forEach((bm: Mesh, listKey: string) => {
			if (!this.blocks.has(listKey)) {
				removeItemFromArray(this.scene.children, this.blockMeshes.get(listKey));
				this.blockMeshes.delete(listKey);
			}
		});
	}

	public toJson(): IWorldData {
		const jsonObj: IWorldData = {
			blocks: [],
		};

		jsonObj.skyColor = {
			red: this.skyColor.r,
			green: this.skyColor.g,
			blue: this.skyColor.b,
		};

		this.blocks.forEach((b: Block, key: string) => {
			jsonObj.blocks.push(b.toJson());
		});

		return jsonObj;
	}

	public toJsonString(): string {
		return JSON.stringify(this.toJson());
	}
}