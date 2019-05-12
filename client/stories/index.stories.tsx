import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  children?: ReactNode
}

function Button(props: Props) {
  return <button onClick={props.onClick}>{props.children}</button>
}

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
