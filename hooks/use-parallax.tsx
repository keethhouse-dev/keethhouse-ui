"use client"

import { useRef, useState, useEffect } from "react"

interface UseParallaxOptions {
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  disabled?: boolean
}

export function useParallax({ speed = 0.2, direction = "up", disabled = false }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Only calculate parallax when element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPosition = (rect.top - windowHeight) * speed

        let transformValue = ""
        switch (direction) {
          case "up":
            transformValue = `translateY(${-scrollPosition}px)`
            break
          case "down":
            transformValue = `translateY(${scrollPosition}px)`
            break
          case "left":
            transformValue = `translateX(${-scrollPosition}px)`
            break
          case "right":
            transformValue = `translateX(${scrollPosition}px)`
            break
        }

        setTransform(transformValue)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction, disabled])

  return { ref, style: { transform } }
}
