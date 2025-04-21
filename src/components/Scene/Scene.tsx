import { useCallback, useEffect, useState } from 'react'
import { Stage } from '@pixi/react'

import { MainContainer } from './MainContainer/MainContainer'
import { calcutaleCanvasSize } from '../../helpers/common'

export const Scene = () => {
  const [canvasSize, setCanvasSize] = useState(calcutaleCanvasSize)

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calcutaleCanvasSize())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [updateCanvasSize])

  return (
    <Stage width={canvasSize.width} height={canvasSize.height}>
      <MainContainer canvasSize={canvasSize} />
    </Stage>
  )
}
