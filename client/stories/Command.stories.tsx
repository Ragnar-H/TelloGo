import React, { ReactNode } from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Command } from '../src/Command'
import { center } from '../.storybook/decorators'

type Props = {
  children: ReactNode
}

function CommandContainer(props: Props) {
  return <div style={{ height: '20rem', width: '10rem' }}>{props.children}</div>
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
        direction="left"
        speed={number('Speed', 10, { min: 10, max: 100, range: true, step: 5 })}
        distance={number('Distance', 20, { min: 20, max: 500, range: true, step: 5 })}
      />
    </CommandContainer>
  ))
  .add('multiple', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CommandContainer>
        <Command
          id="command-id-0"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          direction="left"
          speed={10}
          distance={20}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-1"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          direction="down"
          speed={70}
          distance={250}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-2"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          direction="right"
          speed={20}
          distance={20}
        />
      </CommandContainer>
      <CommandContainer>
        <Command
          id="command-id-3"
          onSetDistance={action('onSetDistance')}
          onSetSpeed={action('onSetSpeed')}
          direction="up"
          speed={10}
          distance={500}
        />
      </CommandContainer>
    </div>
  ))
