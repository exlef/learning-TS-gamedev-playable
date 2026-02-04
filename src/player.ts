import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import playerImg from "./assets/player.png"; // Import logic stays here

export class Player extends PIXI.Sprite {

    // We keep a reference to app so we know screen boundaries
    private app: PIXI.Application;
    private clickCount: number = 0;

    // Static helper: Keeps the asset path inside this file
    public static async loadAssets() {
        await PIXI.Assets.load(playerImg);
    }

    constructor(app: PIXI.Application) {
        // 1. Get the texture (It must be loaded before this constructor runs!)
        const texture = PIXI.Assets.get(playerImg);

        // 2. Initialize the Sprite (The "Parent" class)
        super(texture);

        this.app = app;
        this.setup();
    }

    private setup(): void {
        // Use 'this' because WE are the sprite
        this.anchor.set(0.5);
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height / 2;

        this.eventMode = 'static';
        this.cursor = 'pointer';

        // Bind the click event
        this.on('pointerdown', this.onClick);
    }

    // Arrow function to keep 'this' scope correct
    private onClick = (event: any) => {
        console.log("Player clicked");
        event.stopPropagation();

        this.clickCount++;

        // Update UI (Global DOM access)
        const text = document.getElementById('tutorial-text');
        if (text) text.innerText = `Score: ${this.clickCount}/3`;

        if (this.clickCount >= 3) {
            this.handleWin();
        } else {
            this.animateMove();
        }
    }

    private animateMove(): void {
        const tl = gsap.timeline();

        // Note: We use 'this' as the target
        tl.to(this, {
            x: Math.random() * this.app.screen.width,
            y: Math.random() * this.app.screen.height,
            duration: 1,
            ease: 'back.out(1.7)'
        })
            .to(this.scale, { x: 1.5, y: 1.5, duration: 0.5 }, "<")
            .to(this.scale, { x: 1, y: 1, duration: 0.5 });
    }

    private handleWin(): void {
        const btn = document.getElementById('cta-button');
        if (btn) btn.style.display = 'block';

        this.destroy(); // Destroy OURSELVES
    }

    // Public method for Game to call on resize
    public onResize(): void {
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height / 2;

        if (this.app.screen.width < this.app.screen.height) {
            this.scale.set(1.5);
        } else {
            this.scale.set(0.8);
        }
    }
}