import { useCallback, useEffect, useState } from 'react'

import { Direction } from '../../types/common'
import { DIRECTION_KEYS } from '../../helpers/common'

export const useHeroControls = () => {
  const [heldDirection, setHeldDirection] = useState<Direction[]>([])

  const handleKey = useCallback((event: KeyboardEvent, isKeyDown: boolean) => {
    const direction = DIRECTION_KEYS[event.code]

    if (!direction) return

    setHeldDirection(prev => {
      if (isKeyDown) {
        return prev.includes(direction) ? prev : [direction, ...prev]
      }

      return prev.filter(dir => dir !== direction)
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKey(event, true)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      handleKey(event, false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKey])

  const getControlsDirection = useCallback(() => {
    return heldDirection[0] || null
  }, [heldDirection])

  return { getControlsDirection }
}
