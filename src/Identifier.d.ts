export declare class Identifier {
    static EMPTY: Identifier;
    readonly namespace: string;
    readonly key: string;
    constructor(namespaceOrKey: string, key?: string);
    static fromString(str: string): Identifier;
    toString(): string;
}
