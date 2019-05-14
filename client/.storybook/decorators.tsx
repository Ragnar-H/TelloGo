import React from 'react'

export function center(storyFn: Function) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      {storyFn()}
    </div>
  )
}
