import { useEffect } from 'react'
import Lenis from 'lenis'

export let lenisInstance: Lenis | null = null

/**
 * Initialises Lenis once at the app root.
 * Returns a scrollTo helper for programmatic navigation.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Reset window scroll immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const lenis = new Lenis({
      duration: 1.25,           // seconds per scroll — increase for lazier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisInstance = lenis
    
    // Reset Lenis scroll immediately
    lenis.scrollTo(0, { immediate: true })

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
