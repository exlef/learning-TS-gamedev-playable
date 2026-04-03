import * as pc from 'playcanvas'
import {SpriteManager} from "./sprite-manager.ts";
import {ScreenBounds} from "./screen-bounds.ts";

export class Environment{
    private ground!: pc.Entity;
    private background!: pc.Entity;
    private sky!: pc.Entity;
    constructor() {
        this.createBackground();
        this.createGround();
    }

    createGround(){
        const app = pc.Application.getApplication()!;

        this.ground = new pc.Entity('ground');
        const sprite = SpriteManager.getSprite('base', pc.SPRITE_RENDERMODE_TILED);

        this.ground.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite,
            width: 10.09 * 2,
            height: 1.11,
        });
        app.root.addChild(this.ground);

        this.ground.setLocalScale(1, 1, 1);
        this.ground.setPosition(0, -4.5, 0);
    }

    createBackground(){
        const app = pc.Application.getApplication()!;

        this.background = new pc.Entity('background');
        const sprite = SpriteManager.getSprite('background-day', pc.SPRITE_RENDERMODE_TILED, 100);

        const screenWidth = ScreenBounds.right - ScreenBounds.left;
        this.background.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite,
            width:  screenWidth,
            height: 5.1,
        });
        app.root.addChild(this.background);

        this.background.setPosition(0, -1.5, -2);
        this.background.setLocalScale(1, 1, 1);


        this.sky = new pc.Entity('sky_day');
        const sprite_sky = SpriteManager.getSprite('sky_day', pc.SPRITE_RENDERMODE_TILED, 100);
        this.sky.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite_sky,
            width: screenWidth,
            height: 1000,
        });
        app.root.addChild(this.sky);

        this.sky.setLocalScale(1, 1, 1);
        this.sky.setPosition(0, 0, -2);
    }
}

