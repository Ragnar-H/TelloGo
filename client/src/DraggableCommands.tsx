import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Command } from './Command'
import { secondaryColor, secondaryLightColor, sizingUnit } from './theme'

export type CommandAction = 'up' | 'down' | 'left' | 'right'

const COMMAND_WIDTH = sizingUnit * 16
const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  userSelect: 'none',
  padding: 2 * sizingUnit,
  margin: `0 0 ${sizingUnit}px 0`,
  width: `${COMMAND_WIDTH}px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: isDragging ? secondaryColor : secondaryLightColor,
  ...draggableStyle,
})

export type CommandItem = {
  action: CommandAction
  id: string
}

type CommandProps = {
  action: CommandAction
  index: number
}

export function DraggableCommand(props: CommandProps) {
  return (
    <Draggable key={props.action} draggableId={props.action} index={props.index}>
      {(
        providedDraggable: DraggableProvided,
        snapshotDraggable: DraggableStateSnapshot
      ) => (
        <div>
          <div
            ref={providedDraggable.innerRef}
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            style={getItemStyle(
              providedDraggable.draggableProps.style,
              snapshotDraggable.isDragging
            )}
          >
            <Command command={{ action: props.action, speed: 10, distance: 20 }} />
          </div>
          {providedDraggable.placeholder}
        </div>
      )}
    </Draggable>
  )
}

type CommandsProps = {
  list: CommandItem[]
  direction: 'row' | 'column'
}

export function Commands(props: CommandsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: props.direction }}>
      {props.list.map((command, index) => (
        <DraggableCommand key={index} action={command.action} index={index} />
      ))}
    </div>
  )
}
