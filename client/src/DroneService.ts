let _peerConnection: RTCPeerConnection | null = null
let _dataChannel: RTCDataChannel | null = null

export function setPeerConnection() {
  _peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  })
}

export function getPeerConnection() {
  if (_peerConnection === null) {
    throw new Error('Set drone connection before accessing it')
  }
  return _peerConnection
}

export function setStreamCallback(video: HTMLVideoElement) {
  const peerConnection = getPeerConnection()
  peerConnection.addTransceiver('video', { direction: 'recvonly' })
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0]
    video.autoplay = true
  }
}

export async function negotiateConnection() {
  const peerConnection = getPeerConnection()
  const dataChannelIsOpen = setCommandDataChannel()

  const offer = await peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
  const answer = await fetch('http://localhost:50000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(offer),
  })
  const response = await answer.json()
  await peerConnection.setRemoteDescription(response)
  await dataChannelIsOpen
}

export function setCommandDataChannel(): Promise<{}> {
  const peerConnection = getPeerConnection()
  const initiateDataChannel = peerConnection.createDataChannel('commands')

  const isOpen = new Promise(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initiateDataChannel.onopen = e => {
      _dataChannel = initiateDataChannel
      resolve()
    }
  })

  return isOpen
}

export function getCommandDataChannel() {
  if (_dataChannel === null) {
    throw new Error('Set command channel before accessing it')
  }
  return _dataChannel
}

// type Command = 'connect' | 'streamon' | 'streamoff' | 'land' | 'takeoff' | 'down'
function sendCommand(command: string) {
  const dataChannel = getCommandDataChannel()
  dataChannel.send(command)
}

export function connectToDrone() {
  sendCommand('connect')
}

export function streamOn() {
  sendCommand('streamon')
}

export function streamOff() {
  sendCommand('streamoff')
}

export function takeOff() {
  sendCommand('takeoff')
}

export function land() {
  sendCommand('land')
}

export function down(distance: number) {
  sendCommand(`down ${distance}`)
}
