import { Direction, Position } from '../types/common'

import { COLLISION_MAP } from '../constants/collision-map'
import { TILE_SIZE, COLS } from '../constants/game-world'

export const DIRECTION_KEYS: Record<string, Direction> = {
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
}

const moveTowards = (current: number, target: number, maxStep: number) => {
  return current + Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep)
}

const continueMovement = (currentPosition: Position, targetPosition: Position, step: number): Position => {
  return {
    x: moveTowards(currentPosition.x, targetPosition.x, step),
    y: moveTowards(currentPosition.y, targetPosition.y, step)
  }
}

export const calcutaleCanvasSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  return { width, height }
}

export const calculateNewTarget = (x: number, y: number, direction: Direction): Position => {
  return {
    x: (x / TILE_SIZE) * TILE_SIZE + (direction === 'left' ? -TILE_SIZE : direction === 'right' ? TILE_SIZE : 0),
    y: (y / TILE_SIZE) * TILE_SIZE + (direction === 'up' ? -TILE_SIZE : direction === 'down' ? TILE_SIZE : 0)
  }
}

export const checkCanMove = (target: Position) => {
  const row = Math.floor(target.y / TILE_SIZE)
  const col = Math.floor(target.x / TILE_SIZE)
  const index = row * COLS + col

  if (index < 0 || index >= COLLISION_MAP.length) return false

  return COLLISION_MAP[index] !== 1
}

export const handleMovement = (
  currentPosition: Position,
  targetPosition: Position,
  moveSpeed: number,
  delta: number
) => {
  const step = moveSpeed * TILE_SIZE * delta
  const distance = Math.hypot(targetPosition.x - currentPosition.x, targetPosition.y - currentPosition.y)

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true
    }
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false
  }
}

export const linearInterpolation = (start: number, end: number) => {
  return start + (end - start) * 0.03
}
