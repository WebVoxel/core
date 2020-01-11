export class Identifier {
    public readonly namespace: string;
    public readonly key: string;

    public constructor(namespaceOrKey: string, key?: string) {
        if (key === undefined || key === null) {
            this.namespace = 'jscraft';
            this.key = namespaceOrKey;
        } else {
            this.namespace = namespaceOrKey;
            this.key = key;
        }
    }

    public static fromString(str: string): Identifier {
        const parts: string[] = str.split(/\:/g);
        return new Identifier(parts[0], parts[1]);
    }

    public toString(): string {
        return `${this.namespace}/${this.key}`;
    }
}
