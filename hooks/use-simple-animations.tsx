"use client"

import { useRef, useState, useEffect } from "react"

interface UseSimpleAnimationsOptions {
  threshold?: number
  once?: boolean
  delay?: number
  duration?: number
  easing?: string
}

export function useSimpleAnimations(options?: UseSimpleAnimationsOptions) {
  const {
    threshold = 0.1, // Lower threshold for earlier triggering
    once = true,
    delay = 0,
    duration = 0.7, // Slightly longer duration for smoother effect
    easing = "cubic-bezier(0.22, 1, 0.36, 1)", // Improved easing function
  } = options || {}

  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay before triggering the animation
          setTimeout(() => {
            setIsInView(true)
          }, delay * 1000)

          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin: "50px 0px", // Add rootMargin to trigger animations earlier
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, once, delay])

  return {
    ref,
    isInView,
    className: isInView ? "animate-fade-in" : "opacity-0",
    style: {
      transition: `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`,
      willChange: "opacity, transform",
    },
  }
}
