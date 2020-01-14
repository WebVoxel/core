/**
 * A namespace/key pair for identifying blocks and items.
 * @author RailRunner16
 */
export class Identifier {
    public static EMPTY: Identifier = new Identifier('empty');

    public readonly namespace: string;
    public readonly key: string;

    /**
     * Create a new identifier
     * @param namespaceOrKey The namespace, if no key is provided will become the key
     * @param key The key
     */
    public constructor(namespaceOrKey: string, key?: string) {
        if (key === undefined || key === null) {
            this.namespace = 'unknown';
            this.key = namespaceOrKey;
        } else {
            this.namespace = namespaceOrKey;
            this.key = key;
        }
    }

    /**
     * Create a new identifier from a string in the format `namespace:key`
     * @param str The string
     */
    public static fromString(str: string): Identifier {
        const parts: string[] = str.split(/\:/g);
        return new Identifier(parts[0], parts[1]);
    }

    /**
     * Convert the identifier to a string in the format `namespace:key`
     */
    public toString(): string {
        return `${this.namespace}:${this.key}`;
    }
}
