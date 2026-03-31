import * as pc from 'playcanvas';
import { GameApplication } from './application.ts';
import { Camera } from './camera';
import { Player } from "./player.ts";
import {PipePair} from "./pipe-pair.ts";
import { Light } from './light';
import { Environment } from "./environment.ts";
import { checkOverlap } from "./physics-2d.ts";
import { Input } from "./input.ts";
import {ScreenBounds} from "./screen-bounds.ts";

async function startGame() {
    // 1. Initialize the Engine
    const engine = new GameApplication('application-canvas');

    // 2. Preload Assets
    await engine.preload('assets/spritesheet.png', 'assets/spritesheet.json');

    // 3. Setup Game Scene
    new Environment();
    new Camera();
    new Light();

    const player = new Player();
    const pipePair = new PipePair(ScreenBounds.right + 2);

    // 4. Game Update Loop
    engine.app.on('update', (dt: number) => {
        player.tick(dt);
        pipePair.tick(dt);

        if (checkOverlap(player.rect, pipePair.topRect) || checkOverlap(player.rect, pipePair.bottomRect)) {
            console.log("Game Over: Overlap detected!");
        }

        pipePair.topRect.drawDebug(pc.Color.GREEN);
        pipePair.bottomRect.drawDebug(pc.Color.GREEN);

        // Reset inputs at the very end of the frame
        Input.instance.postUpdate();
    });
}

startGame();