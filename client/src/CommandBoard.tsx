import React, { useState } from 'react'
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
  DroppableProvided,
  DraggableLocation,
} from 'react-beautiful-dnd'
import { CommandItem, Commands, CommandDirection } from './DraggableCommands'
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

function fillMissingCommands(commandList: CommandItem[]): CommandItem[] {
  const commands = commandList.slice()

  initialCommands.map(command => {
    const commandIsAvailable = commands.find(
      availableCommand => availableCommand.direction === command.direction
    )
    if (!commandIsAvailable) {
      commands.push(createCommand(command.direction))
    }
  })

  return commands
}

let commandIdx = 0

function createCommand(direction: CommandDirection): CommandItem {
  return {
    direction,
    id: `${commandIdx++}-command`,
    speed: 10,
    distance: 20,
  }
}

const initialCommands: CommandItem[] = [
  createCommand('up'),
  createCommand('down'),
  createCommand('right'),
  createCommand('left'),
]

export function CommandBoard() {
  const [queuedCommands, setQueuedCommands] = useState<CommandItem[]>([])
  const [availableCommands, setAvailableCommands] = useState(initialCommands)

  function handleSetSpeed(commandId: string, speed: number) {
    const availableClone = availableCommands.slice()
    const availableIdx = availableClone.findIndex(command => command.id === commandId)
    if (availableIdx > 0) {
      availableCommands[availableIdx].speed = speed
      setAvailableCommands(availableClone)
    } else {
      const queuedClone = queuedCommands.slice()

      const queuedIdx = queuedClone.findIndex(command => command.id === commandId)
      if (queuedIdx < 0) {
        throw new Error(`Cannot find command by id ${commandId}`)
      }
      queuedClone[queuedIdx].speed = speed
      setQueuedCommands(queuedClone)
    }
  }

  function handleSetDistance(commandId: string, distance: number) {
    const availableClone = availableCommands.slice()
    const availableIdx = availableClone.findIndex(command => command.id === commandId)
    if (availableIdx > 0) {
      availableCommands[availableIdx].distance = distance
      setAvailableCommands(availableClone)
    } else {
      const queuedClone = queuedCommands.slice()

      const queuedIdx = queuedClone.findIndex(command => command.id === commandId)
      if (queuedIdx < 0) {
        throw new Error(`Cannot find command by id ${commandId}`)
      }
      queuedClone[queuedIdx].distance = distance
      setQueuedCommands(queuedClone)
    }
  }

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

        const filledCommands = fillMissingCommands(resultFromMove.source)

        setAvailableCommands(filledCommands)
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
                <Commands
                  direction="column"
                  list={queuedCommands}
                  onSetDistance={handleSetDistance}
                  onSetSpeed={handleSetSpeed}
                />
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
              <Commands
                direction="row"
                list={availableCommands}
                onSetDistance={handleSetDistance}
                onSetSpeed={handleSetSpeed}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
