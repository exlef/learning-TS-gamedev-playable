import * as pc from 'playcanvas'
import {Input, type PointerEvent} from "./input.ts";
import {Camera} from './camera.ts'
import {Raycaster} from "./raycaster.ts";

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

        Input.instance.on('pointerdown', this.onClick, this);
    }

    Tick(dt: number){
        if(Input.instance.isHeld && this.isSelected){
            this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
        }
        if(Input.instance.justReleased){
            this.isSelected = false;
        }
    }

    private onClick(data: PointerEvent) {
        if (!Camera.main) return;

        const hitEntity = Raycaster.raycast(Camera.main, data.x, data.y, [this.entity]);

        if (hitEntity === this.entity) {
            this.isSelected = true;
        }
    }

    public destroy() {
        // Stop listening to clicks
        Input.instance.off('pointerdown', this.onClick, this);
    }
}