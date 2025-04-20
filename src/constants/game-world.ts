export const TILE_SIZE = 32

// I have a grid of 24x15 tiles and use some additional space
export const COLS = 26
export const ROWS = 17

export const GAME_WIDTH = COLS * TILE_SIZE - TILE_SIZE * 2
export const GAME_HEIGHT = ROWS * TILE_SIZE - TILE_SIZE * 2

export const OFFSET_X = 0
export const OFFSET_Y = TILE_SIZE / 2

export const DEFAULT_POS_X = TILE_SIZE * 10
export const DEFAULT_POS_Y = TILE_SIZE * 15

export const MOVE_SPEED = 0.03
export const ANIMATION_SPEED = 0.2
