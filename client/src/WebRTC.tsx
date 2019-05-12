import React, { useRef } from 'react'
import {
  setPeerConnection,
  negotiateConnection,
  connectToDrone,
  setStreamCallback,
  streamOn,
  streamOff,
  takeOff,
  land,
  down,
} from 'DroneService'

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
      <video ref={video} autoPlay style={{ width: '300px', height: '200px' }} />
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
      <button onClick={streamOn}>Start stream</button>
      <button onClick={streamOff}>Stop stream</button>
      <button onClick={land}>Land</button>
      <button onClick={takeOff}>Take off</button>
      <button onClick={() => down(20)}>Down 20cm</button>
    </div>
  )
}
