import React, { useRef, useState } from 'react'
import {
  setPeerConnection,
  negotiateConnection,
  connectToDrone,
  setStreamCallback,
  streamOn,
} from './DroneService'
import { ServerConnectIcon } from './ServerConnectIcon'
import { primaryDarkColor, primaryColor } from './theme'

async function startWebRTC(video: HTMLVideoElement) {
  setPeerConnection()
  setStreamCallback(video)
  await negotiateConnection()
  connectToDrone()
  streamOn()
}

export function WebRTC() {
  const video = useRef<HTMLVideoElement>(null)
  const [isConnected, setIsConnected] = useState(false)
  return (
    <div style={{ position: 'relative', margin: '8px' }}>
      <video ref={video} autoPlay style={{ height: '100%', width: '100%' }} />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          height: '84px',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: primaryDarkColor,
          borderColor: primaryColor,
          borderWidth: '2px',
          borderRadius: '15px',
          borderStyle: 'solid',
        }}
      >
        <ServerConnectIcon
          isConnected={isConnected}
          onClick={async () => {
            if (video.current === null) {
              throw new Error('Video element is not ready')
            }
            await startWebRTC(video.current)
            setIsConnected(true)
          }}
        />
      </div>
    </div>
  )
}
