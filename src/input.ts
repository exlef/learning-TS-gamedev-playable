import * as pc from 'playcanvas';

export interface PointerEvent {
    x: number;
    y: number;
    dx?: number;
    dy?: number;
    isHeld?: boolean;
    event: pc.MouseEvent | pc.TouchEvent;
}

export class Input extends pc.EventHandler {

    private static _instance: Input;
    private app: pc.Application;

    // --- CONTINUOUS STATE ---
    public isHeld: boolean = false;
    public x: number = 0;
    public y: number = 0;
    public dx: number = 0;
    public dy: number = 0;

    // --- PER-FRAME STATE ---
    public justPressed: boolean = false;
    public justReleased: boolean = false;

    private constructor() {
        super();
        this.app = pc.Application.getApplication()! as pc.Application;

        if (this.app.mouse) {
            this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        }

        if (this.app.touch) {
            this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
            this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
            this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
        }

        this.app.on('postupdate', this.postUpdate, this);
    }

    public static init() {
        if (!Input._instance) {
            Input._instance = new Input();
        }
    }

    public static get instance(): Input {
        if (!Input._instance) {
            console.error("Input is not initialized! Call Input.init() first.");
        }
        return Input._instance;
    }

    // --- MOUSE LISTENERS ---
    private onMouseDown(event: pc.MouseEvent) {
        if (event.button !== pc.MOUSEBUTTON_LEFT) return;
        this.handlePointerDown(event.x, event.y, event);
    }

    private onMouseMove(event: pc.MouseEvent) {
        this.handlePointerMove(event.x, event.y, event.dx, event.dy, event);
    }

    private onMouseUp(event: pc.MouseEvent) {
        if (event.button !== pc.MOUSEBUTTON_LEFT) return;
        this.handlePointerUp(event.x, event.y, event);
    }

    // --- TOUCH LISTENERS ---
    private onTouchStart(event: pc.TouchEvent) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.handlePointerDown(touch.x, touch.y, event);
        }
    }

    private onTouchMove(event: pc.TouchEvent) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const dx = touch.x - this.x;
            const dy = touch.y - this.y;
            this.handlePointerMove(touch.x, touch.y, dx, dy, event);
        }
    }

    private onTouchEnd(event: pc.TouchEvent) {
        this.handlePointerUp(this.x, this.y, event);
    }

    // --- UNIFIED LOGIC ---
    private handlePointerDown(x: number, y: number, event: pc.MouseEvent | pc.TouchEvent) {
        this.isHeld = true;
        this.justPressed = true;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.fire('pointerdown', { x, y, event } as PointerEvent);
    }

    private handlePointerMove(x: number, y: number, dx: number, dy: number, event: pc.MouseEvent | pc.TouchEvent) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.fire('pointermove', { x, y, dx, dy, isHeld: this.isHeld, event } as PointerEvent);
    }

    private handlePointerUp(x: number, y: number, event: pc.MouseEvent | pc.TouchEvent) {
        this.isHeld = false;
        this.justReleased = true;
        this.x = x;
        this.y = y;
        this.fire('pointerup', { x, y, event } as PointerEvent);
    }

    // --- RESET AT THE END OF THE FRAME ---
    public postUpdate() {
        this.justPressed = false;
        this.justReleased = false;
        this.dx = 0;
        this.dy = 0;
    }

    // --- CLEANUP ---
    public destroy() {
        if (this.app.mouse) {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        }
        if (this.app.touch) {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
        }
    }
}