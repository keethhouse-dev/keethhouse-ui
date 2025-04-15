"use client"

import { type ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"

interface SmoothScrollProviderProps {
  children: ReactNode
  enabled?: boolean
}

export function SmoothScrollProvider({ children, enabled = false }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Only initialize Lenis if explicitly enabled
    if (!enabled) return

    // Use a more lightweight configuration
    const lenisInstance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
    }
  }, [enabled])

  return <>{children}</>
}
