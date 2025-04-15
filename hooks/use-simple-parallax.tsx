"use client"

import { useEffect, useState } from "react"

interface UseSimpleParallaxProps {
  speed?: number
}

export function useSimpleParallax({ speed = 0.2 }: UseSimpleParallaxProps = {}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Simple calculation that won't cause performance issues
      const scrollY = window.scrollY
      setOffset(scrollY * speed)
    }

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return { y: offset }
}
