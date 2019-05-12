import React, { useState } from 'react'
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
  DroppableProvided,
  DraggableLocation,
} from 'react-beautiful-dnd'
import { CommandItem, Commands } from './DraggableCommands'
import { primaryDarkColor } from './theme'

const reorder = (
  list: CommandItem[],
  startIndex: number,
  endIndex: number
): CommandItem[] => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const move = ({
  source,
  destination,
  droppableSource,
  droppableDestination,
}: {
  source: CommandItem[]
  destination: CommandItem[]
  droppableSource: DraggableLocation
  droppableDestination: DraggableLocation
}) => {
  const sourceClone = [...source]
  const destClone = [...destination]
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  return { source: sourceClone, destination: destClone }
}

const initialCommands: CommandItem[] = [
  { id: 'first', direction: 'up' },
  { id: 'second', direction: 'down' },
  { id: 'third', direction: 'right' },
  { id: 'fourth', direction: 'left' },
]

export function CommandBoard() {
  const [queuedCommands, setQueuedCommands] = useState<CommandItem[]>([])
  const [availableCommands, setAvailableCommands] = useState(initialCommands)
  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'commands') {
        const items = reorder(availableCommands, source.index, destination.index)
        setAvailableCommands(items)
      } else if (source.droppableId === 'queuedCommands') {
        const items = reorder(queuedCommands, source.index, destination.index)
        setQueuedCommands(items)
      }
    } else {
      if (source.droppableId === 'commands') {
        const resultFromMove = move({
          source: availableCommands,
          destination: queuedCommands,
          droppableSource: source,
          droppableDestination: destination,
        })
        setAvailableCommands(resultFromMove.source)
        setQueuedCommands(resultFromMove.destination)
      } else {
        const resultFromMove = move({
          source: queuedCommands,
          destination: availableCommands,
          droppableSource: source,
          droppableDestination: destination,
        })
        setAvailableCommands(resultFromMove.destination)
        setQueuedCommands(resultFromMove.source)
      }
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="queuedCommands">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: '300px',
                backgroundColor: primaryDarkColor,
              }}
            >
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Commands direction="column" list={queuedCommands} />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="commands" direction="horizontal">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: '120px' }}
            >
              <Commands direction="row" list={availableCommands} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
