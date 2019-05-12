import React from 'react'
import { CommandAction } from 'DraggableCommands'

type DroneCommand =
  | {
      action: CommandAction
      speed: number
      distance: number
    }
  | { action: 'command' | 'streamon' | 'streamoff' | 'land' }

type Props = {
  command: DroneCommand
}

export function Command(props: Props) {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 16L48 16" stroke="red" strokeWidth="4" />
      <path d="M16 2L4 16L16 30" stroke="black" strokeWidth="4" />
    </svg>
  )
}
