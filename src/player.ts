import * as pc from 'playcanvas'
import {Input} from "./input.ts";
import {SpriteManager} from "./sprite-manager.ts";

export class Player {
    private entity: pc.Entity;
    private pos: pc.Vec2;
    private vel: pc.Vec2;
    private xSpeed = 0;
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

        this.pos = new pc.Vec2(0,0);
        this.pos.x = this.entity.getPosition().x;
        this.pos.y = this.entity.getPosition().y;
        this.vel = new pc.Vec2(this.xSpeed, 0);
    }

    Tick(dt: number){
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
        this.entity.setPosition(new pc.Vec3(this.pos.x, this.pos.y, 0));
    }
}