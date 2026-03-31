import * as pc from 'playcanvas'
import {SpriteManager} from "./sprite-manager.ts";

export class Environment{
    private ground!: pc.Entity;
    private background!: pc.Entity;
    constructor() {
        this.createGround();
        this.createBackground();
    }

    createGround(){
        const app = pc.Application.getApplication()!;

        this.ground = new pc.Entity('ground');
        const sprite = SpriteManager.getSprite('base');

        this.ground.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
        });
        app.root.addChild(this.ground);

        this.ground.setLocalScale(1, 1, 1);
        this.ground.setPosition(0, -4.5, 0);
    }

    createBackground(){
        const app = pc.Application.getApplication()!;

        this.background = new pc.Entity('background');
        const sprite = SpriteManager.getSprite('background-day');

        this.background.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
        });
        app.root.addChild(this.background);

        this.background.setPosition(0, 0, 0);
    }
}

