import * as pc from 'playcanvas';

export class EntityPicker {
    private static picker: pc.Picker;

    private constructor() {}

    public static init() {
        const app = pc.Application.getApplication() as pc.Application;

        const width = app.graphicsDevice.width;
        const height = app.graphicsDevice.height;
        this.picker = new pc.Picker(app, width, height);

        app.graphicsDevice.on('resizecanvas', (w, h) => {
            this.picker.resize(w, h);
        });
    }

    public static pick(camera: pc.CameraComponent, x: number, y: number): pc.Entity | null {
        if (!this.picker || !camera) return null;
        const app = pc.Application.getApplication() as pc.Application;

        // Render the hidden color buffer
        this.picker.prepare(camera, app.scene);

        // Read the exact pixel
        const selection = this.picker.getSelection(x, y);

        if (selection.length > 0) {
            const selected = selection[0];

            // 1. Check if we clicked a standard 3D Mesh
            if (selected instanceof pc.MeshInstance) {
                let node: pc.GraphNode | null = selected.node;
                // Walk up the hierarchy to find the Entity
                while (node && !(node instanceof pc.Entity)) {
                    node = node.parent;
                }
                return node as pc.Entity;
            }
            // 2. Check if we clicked a Gaussian Splat
            else {
                // Splat components hold a direct reference to their entity
                return selected.entity as pc.Entity;
            }
        }

        return null;
    }
}