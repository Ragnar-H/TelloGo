import React, { useRef } from 'react'
import {
  setPeerConnection,
  negotiateConnection,
  connectToDrone,
  setStreamCallback,
  streamOn,
  streamOff,
} from './DroneService'

async function startWebRTC(video: HTMLVideoElement) {
  setPeerConnection()
  setStreamCallback(video)
  await negotiateConnection()
  connectToDrone()
}

export function WebRTC() {
  const video = useRef<HTMLVideoElement>(null)
  return (
    <div>
      <video ref={video} autoPlay style={{ height: '100%', width: '100%' }} />
      <button
        onClick={() => {
          if (video.current === null) {
            throw new Error('Video element is not ready')
          }
          startWebRTC(video.current)
        }}
      >
        Connect
      </button>
      <button onClick={connectToDrone}>Connect to drone</button>
      <button onClick={streamOn}>Start stream</button>
      <button onClick={streamOff}>Stop stream</button>
    </div>
  )
}
