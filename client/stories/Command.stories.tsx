import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { Command } from '../src/Command'
import { center } from '../.storybook/decorators'

storiesOf('Command', module)
  .addDecorator(withKnobs)
  .addDecorator(center)
  .add('default', () => (
    <Command
      command={{
        action: 'left',
        speed: number('Speed', 10, { min: 10, max: 100, range: true, step: 1 }),
        distance: number('Distance', 20, { min: 20, max: 500, range: true, step: 1 }),
      }}
    />
  ))
  .add('multiple', () => (
    <div>
      <Command command={{ action: 'left', speed: 10, distance: 20 }} />
      <Command command={{ action: 'down', speed: 70, distance: 250 }} />
      <Command command={{ action: 'right', speed: 20, distance: 20 }} />
      <Command command={{ action: 'up', speed: 10, distance: 500 }} />
    </div>
  ))
