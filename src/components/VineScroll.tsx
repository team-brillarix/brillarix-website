import { useEffect, useRef } from 'react'

// Signature: a monkey that climbs a vine as you scroll the page.
export function VineScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (ref.current) ref.current.style.top = `${pct * 100}%`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="vine-track" aria-hidden="true">
      <div className="vine-monkey" ref={ref}>
        🐒
      </div>
    </div>
  )
}
