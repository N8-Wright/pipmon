import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';

/**
 * Contains a sequence of uniformly-sized images from a tileset source.
 */
export class Tileset {
    private readonly tileset: HTMLImageElement;
    private loaded: boolean;
    /**
     * Generate a sequence of uniformly-sized images from a tileset source.
     * @param source The image source URI/URL
     * @param tileSize The uniform size of each tile
     */
    constructor(source: string, private readonly tileSize: Size) {
        this.tileset = new Image();
        this.tileset.src = source;
        this.tileset.addEventListener('load', this.load);
        this.loaded = false;
    }
    /**
     * Raised when the tileset is finished loading.
     */
    private load(): void {
        this.loaded = true;
    }
    /**
     * Return the tile from the specified position in the tileset.
     */
    public getTile(coordinates: Vec2): Tile {
        if (coordinates.x < 0 || coordinates.y < 0 || (this.loaded && (coordinates.x > this.tileset.width || coordinates.y > this.tileset.height))) {
            throw new Error('Tile coordinates are out of bounds.')
        }
        return new Tile((context, position) => context.drawImage(this.tileset,
            coordinates.x * this.tileSize.width, coordinates.y * this.tileSize.height, this.tileSize.width, this.tileSize.height,
            position.x, position.y, this.tileSize.width, this.tileSize.height));
    }
}

/**
 * Represents a single drawable image element from a tileset.
 */
export class Tile {
    /**
     * Initialize a new instance of `Tile`. Should only be called from the `Tileset` class.
     * @param draw Draw the tile at the specified position on the game window.
     */
    constructor(public readonly draw: (context: CanvasRenderingContext2D, position: Vec2) => void) { }
}