import * as pc from 'playcanvas';
import { SpriteManager } from "./sprite-manager.ts";
import { Rect } from "./physics-2d.ts";

export class PipePair {
    // The invisible parent container that holds both pipes
    private rootEntity: pc.Entity;

    // We need two rects for collisions!
    public topRect: Rect;
    public bottomRect: Rect;

    public speed = 2;

    constructor(startX: number) {
        const app = pc.Application.getApplication() as pc.Application;

        // 1. Create the empty parent entity
        this.rootEntity = new pc.Entity('pipe-pair');
        app.root.addChild(this.rootEntity);
        this.rootEntity.setPosition(startX, 0, 0);

        // 2. Create the top and bottom pipes as children
        // (Assuming 0 is the center of the screen, we space them out)
        const gapSize = 2.5;

        // Create bottom pipe
        const bottomPipe = this.createPipeEntity('pipe-bottom');
        bottomPipe.setLocalPosition(0, -gapSize, 0); // Move down relative to parent
        this.bottomRect = new Rect(bottomPipe, 0.4, 3);

        // Create top pipe
        const topPipe = this.createPipeEntity('pipe-top');
        topPipe.setLocalPosition(0, gapSize, 0); // Move up relative to parent
        // Note: For the top pipe, you might want to flip the sprite upside down!
        topPipe.setLocalEulerAngles(0, 0, 180);
        this.topRect = new Rect(topPipe, 0.4, 3);
    }

    // Notice we only move the root! The children follow automatically.
    tick(dt: number) {
        const pos = this.rootEntity.getPosition();
        pos.x -= this.speed * dt;
        this.rootEntity.setPosition(pos);
    }

    // A helper method that just creates a single visual pipe entity
    private createPipeEntity(name: string): pc.Entity {
        const entity = new pc.Entity(name);
        const sprite = SpriteManager.getSprite('pipe-green');

        entity.addComponent('sprite', {
            type: pc.SPRITETYPE_SIMPLE,
            sprite: sprite
        });

        // Add it as a child to the ROOT entity, not the app.root!
        this.rootEntity.addChild(entity);

        return entity;
    }
}