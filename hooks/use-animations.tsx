"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

type AnimationVariant = "fadeIn" | "slideUp" | "slideRight" | "slideLeft" | "zoom" | "stagger"

export function useAnimations(options?: {
  threshold?: number
  once?: boolean
  variant?: AnimationVariant
  delay?: number
  duration?: number
}) {
  const { threshold = 0.2, once = true, variant = "fadeIn", delay = 0, duration = 0.6 } = options || {}

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Base variants
  const baseVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // Direction based variants
  const variantOptions = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          duration,
          delay,
        },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          duration,
          delay,
        },
      },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          duration,
          delay,
        },
      },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          duration,
          delay,
        },
      },
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    },
  }

  const variants = variantOptions[variant] || baseVariants

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.5,
      },
    },
  }

  return {
    ref,
    isInView,
    variants,
    childVariants,
    animate: isInView ? "visible" : "hidden",
  }
}
