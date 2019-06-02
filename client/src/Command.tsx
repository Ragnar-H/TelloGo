import React from 'react'
import { CommandDirection } from 'DraggableCommands'
import { useSpring, animated } from 'react-spring'
import { secondaryTextColor, secondaryDarkColor, sizingUnit } from './theme'
export const MAX_SPEED = 100
export const MIN_SPEED = 10
export const MAX_DISTANCE = 500
export const MIN_DISTANCE = 20
const STEP = 5

export type DirectedCommand = {
  id: string
  action: CommandDirection
  speed: number
  distance: number
}

type Props = DirectedCommand & {
  onSetSpeed: (speed: number) => void
  onSetDistance: (distance: number) => void
}

function getRotation(direction: CommandDirection) {
  switch (direction) {
    case 'left':
      return 0
    case 'right':
      return 180
    case 'up':
      return 90
    case 'down':
      return -90
    default:
      throw new Error('Unknown direction')
  }
}

function getInitialCoordinates(command: DirectedCommand) {
  const minArrowLength = 8
  const minBaseLength = 24
  const speed = (command.speed / MAX_SPEED) * 8 + minArrowLength
  const distance = (command.distance / MAX_DISTANCE) * 16 + minBaseLength
  const tip = { x: 4, y: 24 }
  const base = { x: tip.x + distance, y: 24 }
  const head = {
    x1: tip.x + speed,
    y1: tip.y - speed,
    x2: tip.x,
    y2: tip.y,
    x3: tip.x + speed,
    y3: tip.y + speed,
  }

  return { tip, base, head }
}

export function Command(props: Props) {
  const coords = getInitialCoordinates({
    action: props.action,
    distance: props.distance,
    speed: props.speed,
    id: props.id,
  })
  const rotation = getRotation(props.action)
  const { tip, base, head } = coords
  const bodyPath = `M${tip.x} ${tip.y}L${base.x} ${base.y}`
  const arrowPath = `M${head.x1} ${head.y1}L${head.x2} ${head.y2}L${head.x3} ${head.y3}`
  const animatedPaths = useSpring({
    bodyPath,
    arrowPath,
  })
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        transform={`rotate(${rotation})`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.path
          d={animatedPaths.bodyPath}
          stroke={secondaryTextColor}
          strokeWidth="4"
        />
        <animated.path
          d={animatedPaths.arrowPath}
          stroke={secondaryTextColor}
          strokeWidth="4"
        />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label
          htmlFor="distance"
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            justifyContent: 'space-between',
            color: secondaryTextColor,
          }}
        >
          Distance
        </label>
        <input
          id="distance"
          type="number"
          max={MAX_DISTANCE}
          min={MIN_DISTANCE}
          step={STEP * 2}
          value={props.distance}
          onChange={event => {
            const newValue = parseInt(event.currentTarget.value)
            if (newValue >= MIN_DISTANCE && newValue <= MAX_DISTANCE) {
              props.onSetDistance(newValue)
            }
          }}
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            color: secondaryTextColor,
            backgroundColor: secondaryDarkColor,
            border: 0,
            borderRadius: `${sizingUnit}px`,
            padding: `${sizingUnit}px`,
          }}
        />
        <label
          htmlFor="speed"
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            justifyContent: 'space-between',
            color: secondaryTextColor,
          }}
        >
          Speed
        </label>
        <input
          id="speed"
          type="number"
          value={props.speed}
          max={MAX_SPEED}
          min={MIN_SPEED}
          step={STEP}
          onChange={event => {
            const newValue = parseInt(event.currentTarget.value)
            if (newValue >= MIN_SPEED && newValue <= MAX_SPEED) {
              props.onSetSpeed(newValue)
            }
          }}
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            color: secondaryTextColor,
            backgroundColor: secondaryDarkColor,
            border: 0,
            borderRadius: `${sizingUnit}px`,
            padding: `${sizingUnit}px`,
          }}
        />
      </div>
    </div>
  )
}
