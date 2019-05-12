import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Command } from '../src/Command'
import { center } from '../.storybook/decorators'

storiesOf('Command', module)
  .addDecorator(withKnobs)
  .addDecorator(center)
  .add('default', () => (
    <Command
      onSetDistance={action('onSetDistance')}
      onSetSpeed={action('onSetSpeed')}
      direction="left"
      speed={number('Speed', 10, { min: 10, max: 100, range: true, step: 5 })}
      distance={number('Distance', 20, { min: 20, max: 500, range: true, step: 5 })}
    />
  ))
  .add('multiple', () => (
    <div>
      <Command
        onSetDistance={action('onSetDistance')}
        onSetSpeed={action('onSetSpeed')}
        direction="left"
        speed={10}
        distance={20}
      />
      <Command
        onSetDistance={action('onSetDistance')}
        onSetSpeed={action('onSetSpeed')}
        direction="down"
        speed={70}
        distance={250}
      />
      <Command
        onSetDistance={action('onSetDistance')}
        onSetSpeed={action('onSetSpeed')}
        direction="right"
        speed={20}
        distance={20}
      />
      <Command
        onSetDistance={action('onSetDistance')}
        onSetSpeed={action('onSetSpeed')}
        direction="up"
        speed={10}
        distance={500}
      />
    </div>
  ))
