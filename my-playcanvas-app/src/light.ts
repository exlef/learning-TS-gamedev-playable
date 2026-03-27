import * as pc from 'playcanvas';

export class Light {
    constructor(app: pc.Application) {
        // Create a directional light
        const light = new pc.Entity('light');
        light.addComponent('light');
        light.setEulerAngles(45, 0, 0);
        app.root.addChild(light);
    }
}