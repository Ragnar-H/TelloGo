import React from 'react'
import { CommandAction } from 'DraggableCommands'

export const MAX_SPEED = 100

type DroneCommand = {
  action: CommandAction
  speed: number
  distance: number
}

type Props = {
  command: DroneCommand
}

function getInitialCoordinates(command: DroneCommand) {
  const minArrowLength = 8
  const speed = (command.speed / MAX_SPEED) * 8 + minArrowLength

  const tip = { x: 4, y: 16 }
  const base = { x: 48, y: 16 }
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
  const { tip, base, head } = getInitialCoordinates(props.command)
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={`M${tip.x} ${tip.y}L${base.x} ${base.y}`} stroke="red" strokeWidth="4" />
      <path
        d={`M${head.x1} ${head.y1}L${head.x2} ${head.y2}L${head.x3} ${head.y3}`}
        stroke="black"
        strokeWidth="4"
      />
    </svg>
  )
}
