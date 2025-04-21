import { Texture } from 'pixi.js'
import { Container, Graphics } from '@pixi/react'

import { Coin } from './Coin'

interface CoinBarProps {
  texture: Texture
}

export const CoinBar = ({ texture }: CoinBarProps) => {
  return (
    <Container x={18} y={10}>
      <Graphics
        draw={g => {
          g.lineStyle(2, 0x000000, 1)
          g.beginFill(0xffffff, 0.8)
          g.drawRect(0, 0, 70, 18)
          g.endFill()
        }}
      />

      <Coin texture={texture} x={0} y={0.1} />
      <Coin texture={texture} x={0.6} y={0.1} />
      <Coin texture={texture} x={1.2} y={0.1} />
    </Container>
  )
}
