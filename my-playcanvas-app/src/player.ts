import * as pc from 'playcanvas'

export class Player {
    private entity: pc.Entity;

    constructor(app: pc.Application) {
        this.entity = new pc.Entity('player');
        this.entity.addComponent('render', {
            type: 'capsule'
        });
        app.root.addChild(this.entity);
    }

    Tick(dt: number){
        this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
    }
}