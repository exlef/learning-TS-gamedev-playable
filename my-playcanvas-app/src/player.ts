import * as pc from 'playcanvas'
import {Input} from "./input.ts";

export class Player {
    private entity: pc.Entity;

    constructor() {
        // 1. Grab the global application instance!
        // We use the '!' non-null assertion operator because we know
        // the app is already initialized in main.ts
        const app = pc.Application.getApplication()!;

        this.entity = new pc.Entity('player');
        this.entity.addComponent('render', {
            type: 'capsule'
        });
        app.root.addChild(this.entity);
    }

    Tick(dt: number){
        if(Input.instance.isPressed){
            this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
        }
    }
}