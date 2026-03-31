import * as pc from 'playcanvas';
import { Camera } from './camera.ts';

export class ScreenBounds {
    // Get the current aspect ratio of the device
    public static get aspectRatio(): number {
        const app = pc.Application.getApplication()!;
        return app.graphicsDevice.width / app.graphicsDevice.height;
    }

    // Top and Bottom are always fixed because of orthoHeight: 5
    public static get top(): number {
        return Camera.main.orthoHeight;
    }

    public static get bottom(): number {
        return -Camera.main.orthoHeight;
    }

    // Right and Left change dynamically based on the device width!
    public static get right(): number {
        return this.top * this.aspectRatio;
    }

    public static get left(): number {
        return -this.right;
    }
}