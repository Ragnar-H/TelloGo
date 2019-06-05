import React, { ReactNode } from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Command } from '../src/Command'
import { ControlCommand } from '../src/ControlCommand'
import { center } from '../.storybook/decorators'

type Props = {
  children: ReactNode
}

function CommandContainer(props: Props) {
  return (
    <div
      style={{
        height: '20rem',
        width: '10rem',
        backgroundColor: '#ffa500',
        padding: '1rem',
      }}
    >
      {props.children}
    </div>
  )
}

storiesOf('Command', module)
  .addDecorator(withKnobs)
  .addDecorator(center)
  .add('default', () => (
    <CommandContainer>
      <Command
        id="some-command-id"
        onSetDistance={action('onSetDistance')}
        onSetSpeed={action('onSetSpeed')}
        action="left"
        speed={number('Speed', 10, { min: 10, max: 100, range: true, step: 5 })}
        distance={number('Distance', 20, { min: 20, max: 500, range: true, step: 5 })}
      />
    </CommandContainer>
  ))
  .add('control commands', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CommandContainer>
        <ControlCommand action="land" />
      </CommandContainer>
      <CommandContainer>
        <ControlCommand action="takeoff" />
      </CommandContainer>
    </div>
  ))
  .add('multiple', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CommandContainer>
        <Command
          id="command-id-0"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="left"
          speed={10}
          distance={20}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-1"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="down"
          speed={70}
          distance={250}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-2"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="right"
          speed={20}
          distance={20}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-3"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="up"
          speed={10}
          distance={500}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-4"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="forward"
          speed={70}
          distance={250}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-5"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          action="back"
          speed={100}
          distance={500}
        />
      </CommandContainer>
    </div>
  ))
