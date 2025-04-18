import { Sprite } from '@pixi/react'
import { GAME_HEIGHT, GAME_WIDTH, OFFSET_X, OFFSET_Y } from '../../constants/game-world'

import levelAsset from '../../assets/tilesets/tilemap.png'

export const Level = () => {
  return <Sprite image={levelAsset} width={GAME_WIDTH} height={GAME_HEIGHT} x={OFFSET_X} y={OFFSET_Y} />
}
