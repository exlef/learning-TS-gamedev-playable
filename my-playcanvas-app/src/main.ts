import * as pc from 'playcanvas';
import { Camera } from './camera';
import {Player} from "./player.ts";
import { Light } from './light';

// 1. Get the canvas element
const canvas = document.getElementById('application-canvas') as HTMLCanvasElement;

// 2. Create the PlayCanvas application
const app = new pc.Application(canvas);
app.start();

// 3. Fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// Ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

// 4. Create a camera
new Camera(app);
const player = new Player(app);
new Light(app);

// 7. Add an update loop to spin the box
app.on('update', (dt: number) => {
    player.Tick(dt);
});