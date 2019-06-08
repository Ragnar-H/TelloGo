import React from 'react'
import { useSpring, animated } from 'react-spring'
type Props = {
  isConnected: boolean
  onClick: () => void
}

function getCoords(connected: boolean) {
  const center = connected ? { x1: 50, x2: 50 } : { x1: 30, x2: 70 }

  const line1Path = `M${center.x1 - 30} 50L${center.x1} 50 M${center.x1} 20L${
    center.x1
  } 80`

  const line2Path = `M${center.x2 + 30} 50L${center.x2} 50 M${center.x2} 20L${
    center.x2
  } 80`
  return {
    line1Path,
    line2Path,
  }
}

export function ServerConnectIcon(props: Props) {
  const { isConnected, onClick } = props
  const coords = getCoords(isConnected)
  const animations = useSpring({ ...coords })
  return (
    <svg
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <animated.path d={animations.line1Path} stroke="black" strokeWidth="4" />
      <animated.path d={animations.line2Path} stroke="black" strokeWidth="4" />
    </svg>
  )
}
