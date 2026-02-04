import * as PIXI from 'pixi.js';
import { Player } from './player'; // Import your class

export class Game {
    private readonly app: PIXI.Application;
    private player!: Player; // Using YOUR custom class type

    constructor() {
        this.app = new PIXI.Application();
    }

    async startGame(): Promise<void> {
        await this.app.init({ resizeTo: window, backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.canvas);
        window.addEventListener('resize', this.onResize);

        await this.loadAssets();
        this.createScene();
    }

    private async loadAssets() {
        // We ask the Player class to load its own specific files
        // but we wait for it HERE.
        await Player.loadAssets();
    }

    private createScene(): void {
        // Instantiate your Custom Class
        // We pass 'this.app' so the player knows about screen size
        this.player = new Player(this.app);

        // Add it to the stage
        this.app.stage.addChild(this.player);

        // Setup Background interactions
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', () => {
            console.log("Missed click (Stage)");
        });

        // Trigger initial resize logic
        this.onResize();
    }

    private onResize = () => {
        // We just tell the player "Hey, the screen changed, update yourself"
        if (this.player && !this.player.destroyed) {
            this.player.onResize();
        }
    }
}