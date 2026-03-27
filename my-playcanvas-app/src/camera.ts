import * as pc from 'playcanvas'

export class Camera{
    private entity: pc.Entity;

    constructor(app: pc.Application) {
        this.entity = new pc.Entity('camera');
        this.entity.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1)
        });
        this.entity.setPosition(0, 0, 5);
        app.root.addChild(this.entity);
    }

}