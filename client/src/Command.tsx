import React from 'react'
import { CommandAction } from 'DraggableCommands'
import { useSpring, animated } from 'react-spring'
import {
  primaryTextColor,
  secondaryTextColor,
  secondaryDarkColor,
  sizingUnit,
} from './theme'
export const MAX_SPEED = 100
export const MAX_DISTANCE = 500
type DroneCommand = {
  action: CommandAction
  speed: number
  distance: number
}

type Props = {
  command: DroneCommand
}

function getRotation(action: CommandAction) {
  switch (action) {
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

function getInitialCoordinates(command: DroneCommand) {
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
  const coords = getInitialCoordinates(props.command)
  const rotation = getRotation(props.command.action)
  const { tip, base, head } = coords
  const bodyPath = `M${tip.x} ${tip.y}L${base.x} ${base.y}`
  const arrowPath = `M${head.x1} ${head.y1}L${head.x2} ${head.y2}L${head.x3} ${head.y3}`
  const animatedPaths = useSpring({
    bodyPath,
    arrowPath,
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <svg
        width="100"
        height="100"
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
            display: 'flex',
            justifyContent: 'space-between',
            color: primaryTextColor,
          }}
        >
          Distance
        </label>
        <input
          id="distance"
          type="number"
          value={props.command.distance}
          style={{
            minWidth: 0,
            display: 'flex',
            color: primaryTextColor,
            backgroundColor: secondaryDarkColor,
            border: 0,
            borderRadius: `${sizingUnit}px`,
            padding: `${sizingUnit}px`,
          }}
        />
        <label
          htmlFor="speed"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: primaryTextColor,
          }}
        >
          Speed
        </label>
        <input
          id="speed"
          type="number"
          value={props.command.speed}
          style={{
            minWidth: 0,
            display: 'flex',
            color: primaryTextColor,
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
