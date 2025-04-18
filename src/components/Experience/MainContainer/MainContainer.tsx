import { PropsWithChildren, useMemo } from 'react'
import { Container, Sprite } from '@pixi/react'
import { Texture } from '@pixi/core'

import backgroundAsset from '../../../assets/space.jpg'

interface MainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({ canvasSize, children }: PropsWithChildren<MainContainerProps>) => {
  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), [])

  return (
    <Container>
      <Sprite texture={backgroundTexture} width={canvasSize.width} height={canvasSize.height} />
      {children}
    </Container>
  )
}
