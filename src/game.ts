import * as PIXI from 'pixi.js';
import playerImg from './assets/player.png';
import gsap from 'gsap'

export class Game{
    private readonly app : PIXI.Application;
    player! : PIXI.Sprite;

    constructor() {
        this.app = new PIXI.Application();
    }

    async startGame() : Promise<void>{
        await this.app.init({resizeTo: window, backgroundColor: 0x1099bb});
        document.body.appendChild(this.app.canvas);

        await this.loadAssets();
        this.createScene();

        this.app.ticker.add((time) => {

        });
    }

    private async loadAssets(){
        await PIXI.Assets.load(playerImg); // We just ensure the asset is loaded into the cache here
    }

    private createScene():void{
        const texture = PIXI.Assets.get(playerImg); // Retrieve texture from cache (it was loaded in loadAssets)
        this.player = new PIXI.Sprite(texture);
        this.player.x = this.app.screen.width / 2;
        this.player.y = this.app.screen.height / 2;
        this.player.anchor.set(0.5, 0.5);

        // input
        this.player.eventMode = 'static';
        this.player.cursor = 'pointer';

        this.player.on('pointerdown', (event)=>{
            console.log("I was clicked");
            const tl = gsap.timeline();
            tl.to(this.player, {
                x : Math.random() * this.app.screen.width,
                y : Math.random() * this.app.screen.height,
                duration : 1,
                ease : 'back.out(1.7)',
                onComplete : () => {
                    console.log('tween completed');
                }
            })
                .to(this.player.scale, {
                    x : 1.5, y: 1.5, duration : 0.5
                }, "<").to(this.player.scale, { //<--- THIS is the secret. The "<" says: "Join the previous start time!"
                x : 1, y: 1, duration : 0.5
            })
            event.stopPropagation();
        });


        this.app.stage.addChild(this.player);
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', (event) => {
            const clickPosition = event.global;
            console.log("clicked at " + clickPosition.x + " " + clickPosition.y);
        });
    }
}