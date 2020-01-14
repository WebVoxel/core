/**
 * A namespace/key pair for identifying blocks and items.
 * @author RailRunner16
 */
export declare class Identifier {
    static EMPTY: Identifier;
    readonly namespace: string;
    readonly key: string;
    /**
     * Create a new identifier
     * @param namespaceOrKey The namespace, if no key is provided will become the key
     * @param key The key
     */
    constructor(namespaceOrKey: string, key?: string);
    /**
     * Create a new identifier from a string in the format `namespace:key`
     * @param str The string
     */
    static fromString(str: string): Identifier;
    /**
     * Convert the identifier to a string in the format `namespace:key`
     */
    toString(): string;
}
