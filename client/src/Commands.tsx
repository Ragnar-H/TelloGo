import React from 'react'
import { ReactComponent as ArrowUp } from './ArrowUp.svg'
import { ReactComponent as ArrowDown } from './ArrowDown.svg'
import { ReactComponent as ArrowRight } from './ArrowRight.svg'
import { ReactComponent as ArrowLeft } from './ArrowLeft.svg'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

export type CommandAction = 'up' | 'down' | 'left' | 'right'

function getIcon(action: CommandAction) {
  switch (action) {
    case 'up':
      return <ArrowUp />
    case 'down':
      return <ArrowDown />
    case 'right':
      return <ArrowRight />
    case 'left':
      return <ArrowLeft />
    default:
      throw new Error('Unknown command')
  }
}

const grid = 8

const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  userSelect: 'none',
  padding: 2 * grid,
  margin: `0 0 ${grid}px 0`,
  width: '88px',
  height: '88px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: isDragging ? 'lightgreen' : 'grey',
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

export function Command(props: CommandProps) {
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
            {getIcon(props.action)}
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
        <Command key={index} action={command.action} index={index} />
      ))}
    </div>
  )
}
