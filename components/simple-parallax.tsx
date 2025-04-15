"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"

interface SimpleParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function SimpleParallax({ children, speed = 0.2, className = "" }: SimpleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrollPosition = window.scrollY
      const elementPosition = scrollPosition + rect.top
      const windowHeight = window.innerHeight

      // Only calculate parallax when element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (scrollPosition - elementPosition) * speed
        setTranslateY(offset)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${translateY}px)`,
        transition: "transform 0.1s linear",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
