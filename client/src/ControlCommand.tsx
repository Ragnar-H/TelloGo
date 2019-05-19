import React from 'react'
import { secondaryTextColor } from './theme'

export type Control = 'land' | 'takeoff'
export type ControlledCommand = {
  id: string
  action: Control
}
type Props = {
  action: Control
}

export function ControlCommand(props: Props) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <svg viewBox="0 0 32 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 3L16.5 47" stroke={secondaryTextColor} strokeWidth="4" />
        {props.action === 'land' ? (
          <path d="M30 16L16.5 3L2 16" stroke={secondaryTextColor} strokeWidth="4" />
        ) : (
          <path d="M2 32L16.5 47L30 32" stroke={secondaryTextColor} strokeWidth="4" />
        )}
        <path
          d="M30 47C30 47.4861 29.7255 48.0168 29.0772 48.5642C28.4312 49.1097 27.4668 49.6234 26.2313 50.0647C23.7647 50.9456 20.3242 51.5 16.5 51.5C12.6758 51.5 9.23531 50.9456 6.76867 50.0647C5.53318 49.6234 4.56876 49.1097 3.92277 48.5642C3.27445 48.0168 3 47.4861 3 47C3 46.5139 3.27445 45.9832 3.92277 45.4358C4.56876 44.8903 5.53318 44.3766 6.76867 43.9353C9.23531 43.0544 12.6758 42.5 16.5 42.5C20.3242 42.5 23.7647 43.0544 26.2313 43.9353C27.4668 44.3766 28.4312 44.8903 29.0772 45.4358C29.7255 45.9832 30 46.5139 30 47Z"
          stroke={secondaryTextColor}
        />
      </svg>
    </div>
  )
}
