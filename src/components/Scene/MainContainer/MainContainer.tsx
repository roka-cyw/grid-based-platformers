import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Container, Sprite } from '@pixi/react'
import { Texture } from '@pixi/core'

import { Camera } from '../../Camera/Camera'
import { Level } from '../../Levels/Level'
import { Hero } from '../../Hero/Hero'
import { Coin } from '../../Coin/Coin'
import { TILE_SIZE } from '../../../constants/game-world'

import backgroundAsset from '../../../assets/space.jpg'
import herodAsset from '../../../assets/hero.png'
import coinAsset from '../../../assets/coin-gold.png'

interface MainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({ canvasSize, children }: PropsWithChildren<MainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })

  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), [])
  const heroTexture = useMemo(() => Texture.from(herodAsset), [])
  const coinTexture = useMemo(() => Texture.from(coinAsset), [])

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) })
  }, [])

  return (
    <Container>
      <Sprite texture={backgroundTexture} width={canvasSize.width} height={canvasSize.height} />
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Level />
        <Hero texture={heroTexture} onMove={updateHeroPosition} />
        <Coin texture={coinTexture} x={5} y={10} />
        <Coin texture={coinTexture} x={6} y={11} />
      </Camera>
    </Container>
  )
}
