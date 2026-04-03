import * as pc from 'playcanvas';
import { Input } from "./input.ts";
import { SpriteManager } from "./sprite-manager.ts";

export class GameApplication {
    public app: pc.Application;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: pc.platform.touch ? new pc.TouchDevice(canvas) : undefined
        });

        this.app.start();
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);

        window.addEventListener('resize', () => this.app.resizeCanvas());

        // Initialize core engine systems
        Input.init();
    }

    // A helper method to handle asset loading before the game starts
    public async preload(textureUrl: string, jsonUrl: string) {
        await SpriteManager.loadMasterSheet(textureUrl, jsonUrl, pc.FILTER_NEAREST);
    }
}