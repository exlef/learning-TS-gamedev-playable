import * as PIXI from 'pixi.js';

// 1. Create the Application (The "Unity Engine")
const app = new PIXI.Application();

// 2. Initialize it (async required for Pixi v8+)
(async () => {
    await app.init({
        resizeTo: window, // Auto-resize to screen
        backgroundColor: 0x1099bb
    });

    // Add the canvas to the HTML document
    document.body.appendChild(app.canvas);

    // 3. Create a "Sprite" (GameObject)
    // For now, we draw a rectangle because we haven't loaded images yet
    const graphics = new PIXI.Graphics();
    graphics.rect(0, 0, 100, 100);
    graphics.fill(0xFF0000); // Red

    // Center it
    graphics.x = app.screen.width / 2;
    graphics.y = app.screen.height / 2;
    graphics.pivot.set(50, 50); // Set Pivot to center (like Anchor)

    // 4. Add to Scene
    app.stage.addChild(graphics);

    // 5. Update Loop (Like void Update())
    app.ticker.add((time) => {
        graphics.rotation += 0.05 * time.deltaTime;
    });
})();