import { Identifier } from './Identifier';
import { Block } from './block/Block';

export class Registry<T> {
	public static readonly BLOCK: Registry<typeof Block> = new Registry<typeof Block>();
	private objectMap: Map<Identifier, T> = new Map<Identifier, T>();

	protected registerObject(id: Identifier, obj: T): void {
		this.objectMap.set(id, obj);
	}

	public static register<U>(registry: Registry<U>, id: Identifier, obj: U): void {
		registry.registerObject(id, obj);
	}
}