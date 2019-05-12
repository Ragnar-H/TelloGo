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
      width="32"
      height="88"
      viewBox="0 0 32 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="16"
        y1="72"
        x2="16"
        y2="4"
        stroke="#C41212"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="4"
        x2="4"
        y2="16"
        stroke="#C41212"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="28"
        y1="16"
        x2="16"
        y2="4"
        stroke="#C41212"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
