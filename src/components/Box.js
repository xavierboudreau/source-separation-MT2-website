import React from 'react'
//import { ResizableBox } from 'react-resizable'

export default function Box ({
  children,
  width = 500,
  height = 300,
  style = {},
  className,
}) {
  return (
    <div>
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...style,
          }}
          className={className}
        >
          {children}
    </div>
  )
}
