import * as pc from 'playcanvas';

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
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1)
});
camera.setPosition(0, 0, 5);
app.root.addChild(camera);

// 5. Create a directional light
const light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 0, 0);
app.root.addChild(light);

// 6. Create a box entity
const box = new pc.Entity('box');
box.addComponent('render', {
    type: 'box'
});
app.root.addChild(box);

// sphere
const sphere = new pc.Entity('sphere');
sphere.addComponent('render', {
    type : 'sphere'
});
const pos = sphere.getPosition();
sphere.setPosition(pos.x - 1, pos.y, pos.z-1);
app.root.addChild(sphere)


// 7. Add an update loop to spin the box
app.on('update', (dt: number) => {
    box.rotate(10 * dt, 20 * dt, 30 * dt);
});