import * as pc from 'playcanvas';

export class Raycaster {
    private static ray: pc.Ray = new pc.Ray();
    private static rayOrigin: pc.Vec3 = new pc.Vec3();
    private static rayEnd: pc.Vec3 = new pc.Vec3();

    private constructor() {}

    /**
     * Shoots a ray from the screen coordinates and returns the closest clicked entity.
     * @param camera the cam we shoot array from
     * @param x Screen X coordinate
     * @param y Screen Y coordinate
     * @param targets Array of entities you want to be clickable
     */
    public static raycast(
        camera: pc.CameraComponent,
        x: number,
        y: number,
        targets: pc.Entity[]
    ): pc.Entity | null {

        if (!camera) return null;

        // Calculate the 3D ray from the 2D screen click
        camera.screenToWorld(x, y, camera.nearClip, this.rayOrigin);
        camera.screenToWorld(x, y, camera.farClip, this.rayEnd);

        const rayDirection = new pc.Vec3().sub2(this.rayEnd, this.rayOrigin).normalize();
        this.ray.set(this.rayOrigin, rayDirection);

        let closestHit: pc.Entity | null = null;
        let closestDistance = Number.MAX_VALUE;

        for (const entity of targets) {
            const meshInstances = entity.render?.meshInstances;
            if (!meshInstances || meshInstances.length === 0) continue;

            const aabb = meshInstances[0].aabb;

            if (aabb.intersectsRay(this.ray)) {
                const dist = this.rayOrigin.distance(entity.getPosition());
                if (dist < closestDistance) {
                    closestDistance = dist;
                    closestHit = entity;
                }
            }
        }

        return closestHit;
    }
}