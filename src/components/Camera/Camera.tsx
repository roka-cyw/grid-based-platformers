import { PropsWithChildren, useRef } from 'react'
import { Container, useTick } from '@pixi/react'
import { Graphics as PIXIGraphics } from 'pixi.js'

import { Position } from '../../types/common'
import { TILE_SIZE, ZOOM } from '../../constants/game-world'
import { linearInterpolation } from '../../helpers/common'

interface CameraProps {
  heroPosition: Position
  canvasSize: { width: number; height: number }
}

export const Camera = ({ canvasSize, heroPosition, children }: PropsWithChildren<CameraProps>) => {
  const containerRef = useRef<PIXIGraphics>(null)

  const cameraPosition = useRef<Position>({ x: canvasSize.width / 2, y: canvasSize.height / 2 })

  useTick(() => {
    if (containerRef.current) {
      const targetX = canvasSize.width / 2 - heroPosition.x * TILE_SIZE * ZOOM - TILE_SIZE
      const targetY = canvasSize.height / 2 - heroPosition.y * TILE_SIZE * ZOOM - TILE_SIZE

      cameraPosition.current.x = linearInterpolation(cameraPosition.current.x, targetX)
      cameraPosition.current.y = linearInterpolation(cameraPosition.current.y, targetY)

      containerRef.current.x = cameraPosition.current.x
      containerRef.current.y = cameraPosition.current.y
    }
  })

  return (
    <Container ref={containerRef} scale={ZOOM}>
      {children}
    </Container>
  )
}
