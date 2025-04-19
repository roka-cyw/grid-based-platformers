import { useEffect, useRef } from 'react'
import { Container, Sprite } from '@pixi/react'
import { Texture } from '@pixi/core'

import { DEFAULT_POS_X, DEFAULT_POS_Y } from '../../constants/game-world'
import { useHeroControls } from './useHeroControls'

interface HeroProps {
  texture: Texture
  onMove: (gridX: number, gridY: number) => void
}

export const Hero = ({ texture, onMove }: HeroProps) => {
  const position = useRef({ x: DEFAULT_POS_X, y: DEFAULT_POS_Y })

  const { getControlsDirection } = useHeroControls()
  const test = getControlsDirection()
  console.log(test)

  useEffect(() => {
    onMove(position.current.x, position.current.y)
  }, [onMove])

  return (
    <Container>
      <Sprite texture={texture} x={position.current.x} y={position.current.y} scale={0.5} anchor={[1, 0.5]} />
    </Container>
  )
}
