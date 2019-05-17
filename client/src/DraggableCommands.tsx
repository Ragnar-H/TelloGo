import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Command, DirectedCommand } from './Command'
import { secondaryColor, secondaryLightColor, sizingUnit } from './theme'
import { ControlledCommand, ControlCommand } from './ControlCommand'

export type CommandDirection = 'up' | 'down' | 'left' | 'right'

const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  userSelect: 'none',
  padding: 2 * sizingUnit,
  margin: `0 0 ${sizingUnit}px 0`,
  width: `${sizingUnit}rem`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: isDragging ? secondaryColor : secondaryLightColor,
  ...draggableStyle,
})

export type CommandItem = DirectedCommand | ControlledCommand

type CommandProps = {
  index: number
  commandItem: CommandItem
  onSetSpeed: (speed: number) => void
  onSetDistance: (distance: number) => void
}

export function DraggableCommand(props: CommandProps) {
  return (
    <Draggable draggableId={props.commandItem.id} index={props.index}>
      {(
        providedDraggable: DraggableProvided,
        snapshotDraggable: DraggableStateSnapshot
      ) => (
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          style={getItemStyle(
            providedDraggable.draggableProps.style,
            snapshotDraggable.isDragging
          )}
        >
          {props.commandItem.action === 'land' ||
          props.commandItem.action === 'takeoff' ? (
            <ControlCommand action={props.commandItem.action} />
          ) : (
            <Command
              id={props.commandItem.id}
              action={props.commandItem.action}
              speed={(props.commandItem as any).speed}
              distance={(props.commandItem as any).distance}
              onSetDistance={props.onSetDistance}
              onSetSpeed={props.onSetSpeed}
            />
          )}
        </div>
      )}
    </Draggable>
  )
}

type CommandsProps = {
  list: CommandItem[]
  direction: 'row' | 'column'
  onSetSpeed: (commandId: string, speed: number) => void
  onSetDistance: (commandId: string, distance: number) => void
}

export function Commands(props: CommandsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: props.direction }}>
      {props.list.map((command, index) => (
        <DraggableCommand
          key={command.id}
          commandItem={command}
          index={index}
          onSetDistance={distance => {
            props.onSetDistance(command.id, distance)
          }}
          onSetSpeed={speed => {
            props.onSetSpeed(command.id, speed)
          }}
        />
      ))}
    </div>
  )
}
