"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"

interface SmoothFadeElementProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
  rootMargin?: string
  duration?: number
}

export function SmoothFadeElement({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
  rootMargin = "50px 0px",
  duration = 0.7,
}: SmoothFadeElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true)
          }, delay * 1000)
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, threshold, rootMargin])

  // Set initial transform based on direction
  let initialTransform = "translateY(0)"
  if (direction === "up") initialTransform = "translateY(15px)"
  if (direction === "down") initialTransform = "translateY(-15px)"
  if (direction === "left") initialTransform = "translateX(15px)"
  if (direction === "right") initialTransform = "translateX(-15px)"

  const style = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translate(0, 0)" : initialTransform,
    transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
    transitionDelay: `${delay}s`,
    willChange: "opacity, transform",
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  )
}
