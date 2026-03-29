import * as pc from 'playcanvas'
import {Input} from "./input.ts";
import {Camera} from './camera.ts'
import {EntityPicker} from "./entity-picker.ts";
import {SpriteManager} from "./sprite-manager.ts";

export class Player {
    private entity: pc.Entity;
    private isSelected = false;

    constructor() {
        const app = pc.Application.getApplication()!;

        this.entity = new pc.Entity('player');
        const sprite = SpriteManager.getSprite('yellowbird-downflap');

        this.entity.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
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
            this.entity.rotate(0,0, 30 * dt);
        }
        if(Input.instance.justReleased){
            this.isSelected = false;
        }
    }
}