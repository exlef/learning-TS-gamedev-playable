import * as PIXI from 'pixi.js';
import playerImg from './assets/player.png';



// 1. Create the Application (The "Unity Engine")
const app = new PIXI.Application();

// 2. Initialize it (async required for Pixi v8+)
(async () => {
    await app.init({
        resizeTo: window, // Auto-resize to screen
        backgroundColor: 0x1099bb
    });

    // Add the canvas to the HTML document
    document.body.appendChild(app.canvas);
    const texture = await PIXI.Assets.load(playerImg);
    const player = new PIXI.Sprite(texture);
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    player.anchor.set(0.5, 0.5);

    // input
    player.eventMode = 'static';
    player.cursor = 'pointer';

    player.on('pointerdown', (event)=>{
       console.log("I was clicked");
       player.x = Math.random() * app.screen.width;
       player.y = Math.random() * app.screen.height;
        event.stopPropagation();
    });


    // 4. Add to Scene
    app.stage.addChild(player);
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerdown', (event) => {
        const clickPosition = event.global;
        console.log("clicked at " + clickPosition.x + " " + clickPosition.y);
    });


    // 5. Update Loop (Like void Update())
    app.ticker.add((time) => {

    });
})();