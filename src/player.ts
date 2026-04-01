import * as pc from 'playcanvas'
import {Input} from "./input.ts";
import {SpriteManager} from "./sprite-manager.ts";
import {Rect} from "./physics-2d.ts";

export class Player {
    private entity: pc.Entity;
    rect: Rect;
    private pos: pc.Vec3;
    private vel: pc.Vec2;
    private gravity = 3;
    private jumpForce = 3;
    private yMaxSpeed = 300;

    constructor() {
        const app = pc.Application.getApplication()!;

        this.entity = new pc.Entity('player');
        const sprite = SpriteManager.getSprite('yellowbird-downflap');

        this.entity.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
        });
        app.root.addChild(this.entity);
        this.rect = new Rect(this.entity, 0.2, 0.2);
        this.pos = new pc.Vec3(0,0, 0);
        this.pos.x = this.entity.getPosition().x;
        this.pos.y = this.entity.getPosition().y;
        this.vel = new pc.Vec2(0, 0);
    }

    tick(dt: number){
        if(Input.instance.justPressed){
            this.vel.y += this.jumpForce;
        }
        this.vel.y -= this.gravity * dt;

        if(this.vel.y > this.yMaxSpeed * dt){
            this.vel.y = this.yMaxSpeed * dt;
        }

        if(this.vel.y < -this.yMaxSpeed * dt){
            this.vel.y = -this.yMaxSpeed * dt;
        }

        this.pos.x =  this.entity.getPosition().x + this.vel.x * dt;
        this.pos.y =  this.entity.getPosition().y + this.vel.y * dt;
        this.entity.setPosition(this.pos);
    }
}