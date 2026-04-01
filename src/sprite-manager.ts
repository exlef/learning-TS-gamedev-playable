import * as pc from 'playcanvas';

interface SpriteConfig {
    border?: [number, number, number, number]; // [Left, Bottom, Right, Top]
    pivot?: [number, number];                  // [X, Y]
}

export class SpriteManager {
    private static masterAtlas: pc.TextureAtlas | null = null;
    private static sprites: Map<string, pc.Sprite> = new Map();

    private static spriteConfigs: Record<string, SpriteConfig> = {
        'pipe-green': {
            border: [0, 0, 0, 24], // Protect the 24px cap
            pivot: [0.5, 1.0]      // Anchor to Top-Center so it only stretches down!
        }
    };

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

            // FETCH THE CONFIG (or use safe defaults if not found)
            const config = this.spriteConfigs[key] || {};
            const border = config.border || [0, 0, 0, 0];
            const pivot = config.pivot || [0.5, 0.5]; // Default to center

            frames[key] = {
                rect: new pc.Vec4(frameData.x, texture.height - frameData.y - frameData.h, frameData.w, frameData.h),
                pivot: new pc.Vec2(pivot[0], pivot[1]),
                border: new pc.Vec4(border[0], border[1], border[2], border[3])
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

        const config = this.spriteConfigs[frameName];
        const hasBorders = !!(config && config.border);

        // Create a new sprite using the specific frame from our master atlas
        const sprite = new pc.Sprite(app.graphicsDevice, {
            atlas: this.masterAtlas,
            frameKeys: [frameName],
            pixelsPerUnit: pixelsPerUnit,
            renderMode: hasBorders ? pc.SPRITE_RENDERMODE_SLICED : pc.SPRITE_RENDERMODE_SIMPLE
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