import React from 'react'
import { useSpring, animated } from 'react-spring'

type Props = {
  isPlaying: boolean
  onClick: () => void
}

export function PlayStopIcon(props: Props) {
  const { isPlaying, onClick } = props

  const path = isPlaying ? 'M0 0L260 0L260 260L0 260' : 'M130 0L260 130L130 260L130 130'
  const animations = useSpring({ iconPath: path })
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      height="100%"
    >
      <animated.path d={animations.iconPath} fill="black" stroke="black" />
    </svg>
  )
}
