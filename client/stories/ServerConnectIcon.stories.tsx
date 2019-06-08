import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import { ServerConnectIcon } from '../src/ServerConnectIcon'

function ServerConnectIconContainer() {
  const [isConnected, setIsConnected] = useState(true)
  return (
    <div style={{ height: '85px', width: '85px' }}>
      <ServerConnectIcon
        isConnected={isConnected}
        onClick={() => {
          setIsConnected(oldIsConnected => !oldIsConnected)
        }}
      />
    </div>
  )
}

storiesOf('ServerConnectIcon', module).add('default', () => (
  <ServerConnectIconContainer />
))
