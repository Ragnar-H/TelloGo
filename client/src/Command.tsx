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
  timeLeft: number
}

function getRotation(direction: CommandDirection) {
  switch (direction) {
    case 'left':
      return 0
    case 'right':
      return 180
    case 'forward':
    case 'up':
      return 90
    case 'back':
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
  const tip = { x: 24 - distance / 2, y: 24 }
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
  const durationLeft = useSpring({ height: 48 * props.timeLeft })
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
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <animated.rect
          width="48"
          height={durationLeft.height}
          fill={secondaryDarkColor}
        />
        <g transform={`rotate(${rotation}, 24, 24)`} x={0}>
          {(props.action === 'up' || props.action === 'down') && (
            <path
              d="M25.5183 46.0019C25.5183 46.0021 25.5166 46.0018 25.5133 46.0008C25.5166 46.0013 25.5183 46.0018 25.5183 46.0019ZM25.6918 45.8439C25.5925 45.9454 25.529 45.9827 25.5 45.9956C25.471 45.9827 25.4075 45.9454 25.3082 45.8439C25.1235 45.6549 24.8975 45.3226 24.6524 44.8044C24.1648 43.7731 23.6992 42.2169 23.2986 40.2138C22.5007 36.2241 22 30.6679 22 24.5C22 18.3321 22.5007 12.7759 23.2986 8.78621C23.6992 6.78313 24.1648 5.22694 24.6524 4.19563C24.8975 3.67744 25.1235 3.34508 25.3082 3.15609C25.4075 3.05458 25.471 3.01725 25.5 3.00435C25.529 3.01725 25.5925 3.05458 25.6918 3.15609C25.8765 3.34508 26.1025 3.67744 26.3476 4.19563C26.8352 5.22694 27.3008 6.78313 27.7014 8.78621C28.4993 12.7759 29 18.3321 29 24.5C29 30.6679 28.4993 36.2241 27.7014 40.2138C27.3008 42.2169 26.8352 43.7731 26.3476 44.8044C26.1025 45.3226 25.8765 45.6549 25.6918 45.8439ZM25.5183 2.99809C25.5183 2.99823 25.5166 2.99874 25.5133 2.9992C25.5166 2.99817 25.5183 2.99794 25.5183 2.99809ZM25.4817 2.99809C25.4817 2.99794 25.4834 2.99817 25.4867 2.9992C25.4834 2.99874 25.4817 2.99823 25.4817 2.99809ZM25.4866 46.0008C25.4833 46.0018 25.4817 46.0021 25.4817 46.0019C25.4817 46.0018 25.4833 46.0013 25.4866 46.0008Z"
              stroke={secondaryTextColor}
              strokeWidth="3"
            />
          )}
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
        </g>
      </svg>

      <div
        style={{ display: 'flex', flexDirection: 'column', padding: `${sizingUnit}px` }}
      >
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
            padding: `${sizingUnit / 2}px`,
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
            padding: `${sizingUnit / 2}px`,
          }}
        />
      </div>
    </div>
  )
}
