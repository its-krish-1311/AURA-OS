"use client"

import React from 'react'
import Spline from '@splinetool/react-spline/next'

interface SplineSceneProps {
  scene: string
  className?: string
}

export const SplineScene = React.memo(function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      <Spline scene={scene} />
    </div>
  )
})
