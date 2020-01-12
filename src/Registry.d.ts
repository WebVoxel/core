import { Identifier } from './Identifier';
import { Block } from './block/Block';
export declare class Registry<T> {
    static readonly BLOCK: Registry<typeof Block>;
    private objectMap;
    protected registerObject(id: Identifier, obj: T): void;
    static register<U>(registry: Registry<U>, id: Identifier, obj: U): void;
}
