import * as pc from 'playcanvas';

export class SpriteManager {
    private static masterAtlas: pc.TextureAtlas | null = null;
    private static sprites: Map<string, pc.Sprite> = new Map();

    /**
     * Call this ONCE when your game starts to load the master sprite sheet.
     */
    static async loadMasterSheet(textureUrl: string, jsonUrl: string): Promise<void> {

        // Load both the image and the JSON file at the same time
        const [textureAsset, jsonAsset] = await Promise.all([
            this.loadAsset(textureUrl, 'texture'),
            this.loadAsset(jsonUrl, 'json')
        ]);

        const texture = textureAsset.resource as pc.Texture;
        const data = jsonAsset.resource as any; // The parsed JSON data

        // Create the master atlas
        this.masterAtlas = new pc.TextureAtlas();
        this.masterAtlas.texture = texture;

        const frames: any = {};

        // Loop through the JSON to define the boundaries of every frame.
        // (Note: This assumes a standard TexturePacker Hash JSON format)
        for (const key in data.frames) {
            const frameData = data.frames[key].frame;
            frames[key] = {
                rect: new pc.Vec4(frameData.x, texture.height - frameData.y - frameData.h, frameData.w, frameData.h),
                pivot: new pc.Vec2(0.5, 0.5),
                border: new pc.Vec4(0, 0, 0, 0)
            };
        }

        this.masterAtlas.frames = frames;
    }

    /**
     * Entities call this to get their specific graphic from the master sheet.
     */
    static getSprite(frameName: string, pixelsPerUnit: number = 100): pc.Sprite {
        if (!this.masterAtlas) {
            throw new Error("Master sheet not loaded yet! Call loadMasterSheet first.");
        }

        // Return cached sprite if we already created it
        if (this.sprites.has(frameName)) {
            return this.sprites.get(frameName)!;
        }

        const app = pc.Application.getApplication()!;

        // Create a new sprite using the specific frame from our master atlas
        const sprite = new pc.Sprite(app.graphicsDevice, {
            atlas: this.masterAtlas,
            frameKeys: [frameName],
            pixelsPerUnit: pixelsPerUnit
        });

        this.sprites.set(frameName, sprite);
        return sprite;
    }

    // Helper to wrap PlayCanvas asset loading in a Promise
    private static loadAsset(url: string, type: string): Promise<pc.Asset> {
        const app = pc.Application.getApplication()!;
        return new Promise((resolve, reject) => {
            app.assets.loadFromUrl(url, type, (err, asset) => {
                if (err || !asset) return reject(err);
                resolve(asset);
            });
        });
    }
}