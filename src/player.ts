import * as pc from 'playcanvas'
import {Input} from "./input.ts";
import {Camera} from './camera.ts'
import {EntityPicker} from "./entity-picker.ts";

export class Player {
    private entity: pc.Entity;
    private isSelected = false;

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
        if(Input.instance.justPressed){
            const hitEntity = EntityPicker.pick(Camera.main, Input.instance.x, Input.instance.y);
            if(hitEntity == this.entity){
                this.isSelected = true
            }
        }
        if(Input.instance.isHeld && this.isSelected){
            this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
        }
        if(Input.instance.justReleased){
            this.isSelected = false;
        }
    }
}