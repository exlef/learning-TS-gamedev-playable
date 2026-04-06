export interface SpriteSettings {
    border?: [number, number, number, number]; // [Left, Bottom, Right, Top]
    pivot?: [number, number];                  // [X, Y]
}

export const spriteConfigs: Record<string, SpriteSettings> = {
    'pipe-green': {
        border: [0, 0, 0, 24],
        pivot: [0.5, 1.0]
    },
    'sky_day': {
        pivot: [0.5, 0.0]
    }
};