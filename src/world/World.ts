import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
import { IWorldData } from './IWorldData';
import { Mesh, Scene, Color, MeshStandardMaterial, BoxGeometry, HemisphereLight, BoxBufferGeometry, TextureLoader, Texture } from 'three';
import _ from 'lodash'
import { Game } from '../Game';

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
export class World {
	public static MISSING_TEXTURE: string = 'data:image/png;base64,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SPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4AQIQDWSdAYAI0hykrecDkDU87teo775GApDWgLTvDCdAAKKBrDMAEEGag7T1fACyhofG0dc47jsHSGtA2neGEyAA0UDWGQCIIM1B2no+AFnD436N+u5rJABpDUj7znACBCAayDoDABGkOUhbzwcga3hoHH2N475zgLQGpH1nOAECEA1knQGACNIcpK3nA5A1PO7XqO++RgKQ1oC07wwnQACigawzABBBmoO09XwAsoaHxtHXOO47B0hrQNp3hhMgANFA1hkAiCDNQdp6PgBZw+N+jfruayQAaQ1I+85wAgQgGsg6AwARpDlIW88HIGt4aBx9jeO+c4C0BqR9ZzgBAhANZJ0BgAjSHKSt5wOQNTzu16jvvkYCkNaAtO8MJ0AAooGsMwAQQZqDtPV8ALKGh8bR1zjuOwdIa0Dad4YTIADRQNYZAIggzUHaej4AWcPjfo367mskAGkNSPvOcAIEIBrIOgMAEaQ5SFvPByBreGgcfY3jvnOAtAakfWc4PwPk929fz+vlzxmYgb/OwD+/+fH1vH9eb//C+HMGZuDTDHz48OH1PM+3z9s/r+cNkd8++nMGZuDLGfj++e7j8zz+nIEZ+HIG/sTjP+4R7+04WqddAAAAAElFTkSuQmCC';
	public scene: Scene;
	public blocks: Map<string, Block> = new Map<string, Block>();
	public blockMeshes: Map<string, Mesh> = new Map();
	private skyColor: Color = new Color(0x87ceeb);
	private light?: HemisphereLight;
	private game?: Game;

	/**
	 * Create a new world.
	 * @param {IWorldData} data The world data to start with. Optional
	 */
	constructor(data?: IWorldData) {
		this.scene = new Scene();

		if (data) for (const blockData of data.blocks) {
			const b = new Block(blockData);
			this.blocks.set(World.formatListKey(b.coords), b);
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

			if (this.game!.textureRoot) texture = textureLoader.load(`${this.game!.textureRoot}/${b.type.namespace}/block/${b.type.key}.png`);
			else texture = textureLoader.load(World.MISSING_TEXTURE);

			const geometry = new BoxBufferGeometry(1, 1, 1);
			const material = new MeshStandardMaterial({
				map: texture,
			});

			const blockMesh = new Mesh(geometry, material);
			this.scene.add(blockMesh);
			this.blockMeshes.set(keyCoords, blockMesh)

			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});

		this.light = new HemisphereLight(this.skyColor);
		this.scene.add(this.light);
	}

	/**
	 * Set the sky color of the worlda
	 * @param {THREE.Color} skyColor The new sky color
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
}