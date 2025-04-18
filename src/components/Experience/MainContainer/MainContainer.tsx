import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Container, Sprite } from '@pixi/react'
import { Texture } from '@pixi/core'

import { Level } from '../../Levels/Level'
import { Hero } from '../../Hero/Hero'
import { TILE_SIZE } from '../../../constants/game-world'

import backgroundAsset from '../../../assets/space.jpg'
import herodAsset from '../../../assets/hero.png'

interface MainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({ canvasSize, children }: PropsWithChildren<MainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })

  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), [])
  const heroTexture = useMemo(() => Texture.from(herodAsset), [])

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) })
  }, [])

  return (
    <Container>
      <Sprite texture={backgroundTexture} width={canvasSize.width} height={canvasSize.height} />
      {children}
      <Level />
      <Hero texture={heroTexture} onMove={updateHeroPosition} />
    </Container>
  )
}
