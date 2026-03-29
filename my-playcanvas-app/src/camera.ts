import * as pc from 'playcanvas'

export class Camera{
    private entity: pc.Entity;
    public static main: pc.CameraComponent;

    constructor() {
        const app = pc.Application.getApplication()!;
        this.entity = new pc.Entity('camera');
        this.entity.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1)
        });
        this.entity.setPosition(0, 0, 5);
        app.root.addChild(this.entity);

        Camera.main = this.entity.camera!;
    }

}