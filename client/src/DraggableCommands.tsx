import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Command } from './Command'
import { secondaryColor, secondaryLightColor, sizingUnit } from './theme'

export type CommandDirection = 'up' | 'down' | 'left' | 'right'

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
  direction: CommandDirection
  id: string
}

type CommandProps = {
  direction: CommandDirection
  index: number
  draggableId: string
}

export function DraggableCommand(props: CommandProps) {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
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
            <Command direction={props.direction} speed={10} distance={20} />
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
        <DraggableCommand
          key={command.id}
          direction={command.direction}
          index={index}
          draggableId={command.id}
        />
      ))}
    </div>
  )
}
