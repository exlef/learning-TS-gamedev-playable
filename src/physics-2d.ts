import * as pc from 'playcanvas';

export class Rect{
    entity: pc.Entity;
    width: number;
    height: number;
    pivotX: number;
    pivotY: number;

    constructor(entity: pc.Entity, width: number, height: number, pivotX = 0.5, pivotY = 0.5) {
        this.entity = entity;
        this.width = width;
        this.height = height;
        this.pivotX = pivotX;
        this.pivotY = pivotY;
    }

    // --- CORE EDGES (PlayCanvas Y-Up) ---
    get left(): number   { return this.entity.getLocalPosition().x - (this.width * this.pivotX); }
    get right(): number  { return this.left + this.width; }
    get bottom(): number { return this.entity.getLocalPosition().y - (this.height * this.pivotY); }
    get top(): number    { return this.bottom + this.height; }

    // --- EXPLICIT CORNERS ---
    get bottomLeftX(): number  { return this.left; }
    get bottomLeftY(): number  { return this.bottom; }

    get bottomRightX(): number { return this.right; }
    get bottomRightY(): number { return this.bottom; }

    get topLeftX(): number     { return this.left; }
    get topLeftY(): number     { return this.top; }

    get topRightX(): number    { return this.right; }
    get topRightY(): number    { return this.top; }

    // --- CENTERS ---
    get centerX(): number { return this.left + (this.width / 2); }
    get centerY(): number { return this.bottom + (this.height / 2); }

    // --- THE PIVOT POINT COORDINATES ---
    get pivotPointX(): number { return this.entity.getLocalPosition().x; }
    get pivotPointY(): number { return this.entity.getLocalPosition().y; }

    // --- DEBUGGING ---
    drawDebug(color: pc.Color = pc.Color.RED) {
        const app = pc.Application.getApplication() as pc.Application;
        if (!app) {
            return;
        }

        const bl = new pc.Vec3(this.bottomLeftX, this.bottomLeftY, 0);
        const br = new pc.Vec3(this.bottomRightX, this.bottomRightY, 0);
        const tl = new pc.Vec3(this.topLeftX, this.topLeftY, 0);
        const tr = new pc.Vec3(this.topRightX, this.topRightY, 0);

        app.drawLine(bl, br, color);
        app.drawLine(br, tr, color);
        app.drawLine(tr, tl, color);
        app.drawLine(tl, bl, color);
    }
}


/**
 * checks overlaps between two rects
 * @param rect1
 * @param rect2
 */
export function checkOverlap(rect1: Rect, rect2: Rect): boolean {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.bottom < rect2.top &&
        rect1.top > rect2.bottom
    );
}