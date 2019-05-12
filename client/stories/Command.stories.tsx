import React from 'react'

import { storiesOf } from '@storybook/react'

import { Command } from '../src/Command'
import { center } from '../.storybook/decorators'

storiesOf('Command', module)
  .addDecorator(center)
  .add('default', () => <Command command={{ action: 'left', speed: 10, distance: 20 }} />)
  .add('multiple', () => (
    <div>
      <Command command={{ action: 'left', speed: 10, distance: 20 }} />
      <Command command={{ action: 'down', speed: 70, distance: 250 }} />
      <Command command={{ action: 'right', speed: 20, distance: 20 }} />
      <Command command={{ action: 'up', speed: 10, distance: 500 }} />
    </div>
  ))
