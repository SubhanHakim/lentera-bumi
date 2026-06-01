import { useEffect } from 'react'
import Lenis from 'lenis'

export let lenisInstance: Lenis | null = null

/**
 * Initialises Lenis once at the app root.
 * Returns a scrollTo helper for programmatic navigation.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,           // seconds per scroll — increase for lazier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisInstance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/**
 * Smooth-scroll to a section by id or CSS selector.
 * Accounts for the fixed navbar height automatically.
 */
export function scrollToSection(target: string) {
  const el = document.querySelector(target)
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -80 })
  } else {
    // CSS fallback
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
