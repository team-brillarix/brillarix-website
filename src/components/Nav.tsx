import { useEffect, useRef, useState } from 'react'
import { EASE, MOTION_OK, gsap, useGSAP } from '../lib/gsap'

// Playful labels, real section anchors.
const NAV_LINKS = [
  { label: 'What We Build', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Shipped', href: '#work' },
  { label: 'Build System', href: '#process' },
  { label: 'The Troop', href: '#troop' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(navRef.current, {
          y: -90,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          delay: 0.15,
        })
      })
    },
    { scope: navRef },
  )

  return (
    <nav ref={navRef} className={`nav-j${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-j-inner">
        <a className="logo-j" href="#top" onClick={() => setOpen(false)}>
          <span className="mark">🐒</span>Brilla<b>rix</b>
        </a>
        <button
          className="nav-burger-j"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links-j${open ? ' open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav-cta-j" href="#calendly" onClick={() => setOpen(false)}>
              Book a build call 🍌
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
