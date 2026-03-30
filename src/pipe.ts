import * as pc from 'playcanvas'
import {SpriteManager} from "./sprite-manager.ts";
import {Rect} from "./physics-2d.ts";

export class Pipe{
    private entity: pc.Entity;
    rect: Rect;

    constructor() {
        const app = pc.Application.getApplication()!;

        this.entity = new pc.Entity('pipe');
        const sprite = SpriteManager.getSprite('pipe-green');

        this.entity.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
        });
        app.root.addChild(this.entity);

        this.entity.setPosition(5, 0, 0);

        this.rect = new Rect(this.entity, 0.4,3);
    }
}