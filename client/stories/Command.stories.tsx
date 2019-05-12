import React from 'react'

import { storiesOf } from '@storybook/react'

import { Command } from '../src/Command'
import { center } from '../.storybook/decorators'

storiesOf('Command', module)
  .addDecorator(center)
  .add('default', () => <Command command={{ action: 'up', speed: 10, distance: 20 }} />)
