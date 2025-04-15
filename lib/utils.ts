import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateParallax(mouseX: number, mouseY: number, intensity = 1, reverse = false) {
  const x = reverse ? mouseX * intensity : mouseX * -intensity
  const y = reverse ? mouseY * intensity : mouseY * -intensity

  return {
    x,
    y,
  }
}

export function applyAnimationStyle(style: any, additionalStyles: any = {}) {
  return {
    ...style,
    ...additionalStyles,
    transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
  }
}
