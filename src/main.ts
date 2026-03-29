import * as pc from 'playcanvas';
import { Camera } from './camera';
import {Player} from "./player.ts";
import { Light } from './light';
import {Input} from "./input.ts";
import {EntityPicker} from "./entity-picker.ts";
import {SpriteManager} from "./sprite-manager.ts";

// 1. Get the canvas element
const canvas = document.getElementById('application-canvas') as HTMLCanvasElement;
// Prevent the right-click / long-press context menu from appearing
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// 2. Create the PlayCanvas application
const app = new pc.Application(canvas, {
    mouse: new pc.Mouse(canvas),
    touch: pc.platform.touch ? new pc.TouchDevice(canvas) : undefined
});
app.start();

// 3. Fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// Ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

await SpriteManager.loadMasterSheet('assets/spritesheet.png', 'assets/spritesheet.json');
Input.init();
EntityPicker.init();
new Camera();
const player = new Player();
new Light();

// 7. Add an update loop to spin the box
app.on('update', (dt: number) => {
    player.Tick(dt);

    Input.instance.postUpdate();
});