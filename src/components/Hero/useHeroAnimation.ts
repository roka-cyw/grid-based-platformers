import { useRef, useState } from 'react'
import { Sprite } from 'pixi.js'
import { Texture, Rectangle } from '@pixi/core'

import { TILE_SIZE } from '../../constants/game-world'
import { Direction } from '../../types/common'

interface HeroAnimationProps {
  texture: Texture
  frameWidth: number
  frameHeight: number
  animationSpeed: number
  totalFrames: number
}

export const useHeroAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  animationSpeed,
  totalFrames
}: HeroAnimationProps) => {
  const [sprite, setSprite] = useState<Sprite | null>(null)
  const frameRef = useRef(0)
  const elapsedTimeRef = useRef(0)

  const getRowByDirection = (direction: Direction | null) => {
    switch (direction) {
      case 'up':
        return 8
      case 'left':
        return 9
      case 'down':
        return 10
      case 'right':
        return 11

      default:
        return 10
    }
  }

  const createSprite = (row: number, column: number) => {
    const frame = new Texture(
      texture.baseTexture,
      new Rectangle(column * frameWidth, row * frameHeight, frameWidth, frameHeight)
    )

    const newSprite = new Sprite(frame)
    newSprite.width = TILE_SIZE
    newSprite.height = TILE_SIZE

    return newSprite
  }

  const updateSprite = (direction: Direction | null, isMoving: boolean) => {
    const row = getRowByDirection(direction)
    let column = 0

    if (isMoving) {
      elapsedTimeRef.current += animationSpeed

      if (elapsedTimeRef.current >= 1) {
        elapsedTimeRef.current = 0
        frameRef.current = (frameRef.current + 1) % totalFrames
      }
      column = frameRef.current
    }

    const newSprite = createSprite(row, column)
    setSprite(newSprite)
  }

  return { sprite, updateSprite }
}
