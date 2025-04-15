"use client"

import { useState, useEffect } from "react"

export function useConnectionQuality() {
  const [isSlowConnection, setIsSlowConnection] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)

    // Check connection quality using the Network Information API
    if ("connection" in navigator) {
      // @ts-ignore - TypeScript doesn't know about the connection property
      const connection = navigator.connection

      if (connection) {
        // Check if the connection is slow
        const isEffectiveTypeSlow =
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g" ||
          connection.effectiveType === "3g"

        setIsSlowConnection(isEffectiveTypeSlow || connection.saveData)

        // Listen for changes in connection
        const handleConnectionChange = () => {
          setIsSlowConnection(
            connection.effectiveType === "slow-2g" ||
              connection.effectiveType === "2g" ||
              connection.effectiveType === "3g" ||
              connection.saveData,
          )
        }

        connection.addEventListener("change", handleConnectionChange)
        return () => connection.removeEventListener("change", handleConnectionChange)
      }
    }

    // Fallback: check if the device is likely mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Assume mobile devices might have slower connections
    setIsSlowConnection(isMobileDevice)
  }, [])

  return {
    isSlowConnection,
    isReducedMotion,
    shouldReduceAnimations: isSlowConnection || isReducedMotion,
  }
}
