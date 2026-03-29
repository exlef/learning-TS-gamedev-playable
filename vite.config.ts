import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import texturePacker from 'free-tex-packer-core';

// This is our custom Vite Plugin
function spriteAtlasGenerator(): Plugin {
    return {
        name: 'vite-plugin-sprite-atlas-generator',

        // buildStart runs once every time you run `npm run dev` or `npm run build`
        buildStart() {
            // Define our folders
            const spritesDir = path.resolve(__dirname, 'src/assets/sprites');
            const outDir = path.resolve(__dirname, 'public/assets');

            // If the sprites folder doesn't exist yet, just skip
            if (!fs.existsSync(spritesDir)) return;

            // Read all the individual .png files
            const images = fs.readdirSync(spritesDir)
                .filter(file => file.endsWith('.png'))
                .map(file => ({
                    path: file,
                    contents: fs.readFileSync(path.join(spritesDir, file))
                }));

            if (images.length === 0) return;

            // Pack them together!
            texturePacker(images, {
                textureName: 'spritesheet',
                width: 2048,
                height: 2048,
                padding: 2,
                allowRotation: false,
                allowTrim: false,
                exporter: 'JsonHash' as any,
                removeFileExtension: true
            }, (files, error) => {
                if (error) {
                    console.error('Texture packing failed:', error);
                    return;
                }

                // Save the generated .png and .json to the public/assets folder
                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir, { recursive: true });
                }

                for (const item of files) {
                    fs.writeFileSync(path.join(outDir, item.name), item.buffer);
                }

                console.log('✅ Master Sprite Atlas automatically generated!');
            });
        }
    };
}

// Export the Vite configuration
export default defineConfig({
    plugins: [
        spriteAtlasGenerator()
    ]
});