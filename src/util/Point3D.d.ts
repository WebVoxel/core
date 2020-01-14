/**
 * A point in 3D space.
 * @author RailRunner16
 */
export declare class Point3D {
    static ORIGIN: Point3D;
    x: number;
    y: number;
    z: number;
    /**
     * Create a new 3D point
     * @param {number} x The X coordinate
     * @param {number} y The Y coordinate
     * @param {number} z The Z coordinate
     */
    constructor(x: number, y: number, z: number);
}
