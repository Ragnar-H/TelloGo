import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import { PlayStopIcon } from '../src/PlayStopIcon'

function PlayStopIconContainer() {
  const [isPlaying, setIsPlaying] = useState(true)
  return (
    <div style={{ height: '85px', width: '85px' }}>
      <PlayStopIcon
        isPlaying={isPlaying}
        onClick={() => setIsPlaying(oldIsPlaying => !oldIsPlaying)}
      />
    </div>
  )
}

storiesOf('PlayStopIcon', module).add('default', () => <PlayStopIconContainer />)
