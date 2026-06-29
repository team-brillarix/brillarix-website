import { useCallback, useEffect, useRef, useState } from 'react'

const GAME_SECONDS = 20
const CATCH_Y = 84 // % from top of play area where the basket sits
const HALF_W = 9 // % horizontal catch tolerance
const KEY_SPEED = 95 // %/sec — continuous basket speed while an arrow key is held
const POP_LIFE = 0.8 // seconds a floating score pop lives
const POP_RISE = 16 // % the pop drifts upward over its life

type Kind = 'banana' | 'star' | 'coconut'
type Item = { id: number; x: number; y: number; vy: number; type: Kind }
type Pop = { id: number; x: number; value: number; t: number }

const EMOJI: Record<Kind, string> = { banana: '🍌', star: '⭐', coconut: '🥥' }
const POINTS: Record<Kind, number> = { banana: 1, star: 2, coconut: -1 }

const secondaryBtn =
  'rounded-full border-2 border-forest/20 px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-leaf hover:text-leaf'

export function BananaCatchGame({
  open,
  name,
  onClose,
}: {
  open: boolean
  name?: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const areaRef = useRef<HTMLDivElement | null>(null)

  const [phase, setPhase] = useState<'idle' | 'playing' | 'over'>('idle')
  const [items, setItems] = useState<Item[]>([])
  const [pops, setPops] = useState<Pop[]>([])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(GAME_SECONDS)
  const [basket, setBasket] = useState(50)

  // mutable game state (avoids stale closures in the rAF loop)
  const itemsRef = useRef<Item[]>([])
  const popsRef = useRef<Pop[]>([])
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_SECONDS)
  const basketRef = useRef(50)
  const keysRef = useRef({ left: false, right: false })
  const idRef = useRef(0)
  const popIdRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const spawnRef = useRef(0)

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const endGame = useCallback(() => {
    stopLoop()
    setPhase('over')
  }, [stopLoop])

  const loop = useCallback(
    (now: number) => {
      const last = lastRef.current || now
      let dt = (now - last) / 1000
      lastRef.current = now
      if (dt > 0.05) dt = 0.05 // clamp (tab switches) so items can't tunnel past the basket

      // continuous keyboard movement — smooth, frame-driven, not OS key-repeat
      const dir = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0)
      if (dir) {
        basketRef.current = Math.max(5, Math.min(95, basketRef.current + dir * KEY_SPEED * dt))
        setBasket(basketRef.current)
      }

      timeRef.current -= dt
      if (timeRef.current <= 0) {
        timeRef.current = 0
        setTime(0)
        endGame()
        return
      }

      spawnRef.current -= dt
      if (spawnRef.current <= 0) {
        spawnRef.current = 0.58 + Math.random() * 0.34
        const r = Math.random()
        const type: Kind = r < 0.16 ? 'coconut' : r < 0.36 ? 'star' : 'banana'
        itemsRef.current.push({
          id: idRef.current++,
          x: 8 + Math.random() * 84,
          y: -6,
          vy: 30 + Math.random() * 20 + (type === 'star' ? 8 : 0),
          type,
        })
      }

      const bx = basketRef.current
      const next: Item[] = []
      for (const it of itemsRef.current) {
        const ny = it.y + it.vy * dt
        if (it.y < CATCH_Y && ny >= CATCH_Y && Math.abs(it.x - bx) < HALF_W) {
          const delta = POINTS[it.type]
          scoreRef.current = Math.max(0, scoreRef.current + delta)
          popsRef.current.push({ id: popIdRef.current++, x: it.x, value: delta, t: 0 })
          continue // caught — remove
        }
        if (ny > 106) continue // missed — off-screen
        it.y = ny
        next.push(it)
      }
      itemsRef.current = next

      // advance floating score pops
      const nextPops: Pop[] = []
      for (const p of popsRef.current) {
        p.t += dt
        if (p.t < POP_LIFE) nextPops.push(p)
      }
      popsRef.current = nextPops

      setItems(next.slice())
      setPops(nextPops.slice())
      setScore(scoreRef.current)
      setTime(Math.ceil(timeRef.current))
      rafRef.current = requestAnimationFrame(loop)
    },
    [endGame],
  )

  const start = useCallback(() => {
    itemsRef.current = []
    popsRef.current = []
    scoreRef.current = 0
    timeRef.current = GAME_SECONDS
    spawnRef.current = 0.25
    lastRef.current = 0
    keysRef.current = { left: false, right: false }
    setItems([])
    setPops([])
    setScore(0)
    setTime(GAME_SECONDS)
    setPhase('playing')
  }, [])

  // Open the dialog and drop straight into the game (reduced-motion users get
  // the static intro screen instead, so motion stays opt-in for them).
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) {
      basketRef.current = 50
      setBasket(50)
      d.showModal()
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
      if (reduced) {
        setPhase('idle')
        setItems([])
        setPops([])
        setScore(0)
        setTime(GAME_SECONDS)
      } else {
        start()
      }
    } else if (!open && d.open) {
      d.close()
    }
  }, [open, start])

  // Drive the loop from the phase effect so its cleanup can't cancel a freshly
  // scheduled frame (which is what happens if start() schedules the rAF itself).
  useEffect(() => {
    if (phase !== 'playing') return
    lastRef.current = 0
    rafRef.current = requestAnimationFrame(loop)
    return () => stopLoop()
  }, [phase, loop, stopLoop])

  // keyboard: track held arrows; the loop applies the movement each frame
  useEffect(() => {
    if (phase !== 'playing') return
    const down = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        keysRef.current.left = true
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        keysRef.current.right = true
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keysRef.current.left = false
      else if (e.key === 'ArrowRight') keysRef.current.right = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      keysRef.current = { left: false, right: false }
    }
  }, [phase])

  const moveTo = useCallback((clientX: number) => {
    const a = areaRef.current
    if (!a) return
    const r = a.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100))
    basketRef.current = pct
    setBasket(pct)
  }, [])

  const handleClose = useCallback(() => {
    stopLoop()
    onClose()
  }, [onClose, stopLoop])

  const firstName = name?.trim().split(/\s+/)[0]
  const blurb =
    score >= 22
      ? 'Troop-grade reflexes. 🐒'
      : score >= 12
        ? 'Nice swinging!'
        : 'The bananas were slippery — but we caught your message.'

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleClose}
      className="m-auto w-[min(92vw,520px)] rounded-[28px] border-2 border-lime/30 bg-cream p-0 text-forest shadow-[0_40px_100px_-30px_rgba(4,16,9,0.7)] backdrop:bg-[#06140c]/75 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-forest/50 transition-colors hover:bg-forest/10 hover:text-forest"
      >
        ✕
      </button>

      {phase === 'idle' && (
        <div className="px-7 py-9 text-center sm:px-9">
          <span className="text-4xl" aria-hidden="true">
            🍌
          </span>
          <h3 className="font-display mt-3 text-2xl text-forest sm:text-3xl">
            {firstName ? `Thanks, ${firstName}!` : 'Message caught!'}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-forest-soft">
            Your message is in the troop&rsquo;s hands — we swing back within a day.
          </p>
          <p className="mt-5 text-sm text-forest/65">
            Feeling playful? Catch bananas &amp; stars, dodge coconuts, for {GAME_SECONDS} seconds.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={start} className="btn-j banana">
              Catch some bananas 🍌
            </button>
            <button type="button" onClick={handleClose} className={secondaryBtn}>
              No thanks
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div className="px-5 pb-6 pt-12 sm:px-6">
          <p className="mb-3 px-2 text-center text-sm leading-snug text-forest-soft">
            <span className="font-display text-[15px] text-forest">
              {firstName ? `Thanks, ${firstName}!` : 'Message caught!'}
            </span>{' '}
            We swing back within a day — grab a few bananas while you wait.
          </p>
          <div
            ref={areaRef}
            onPointerMove={(e) => moveTo(e.clientX)}
            onPointerDown={(e) => moveTo(e.clientX)}
            className="relative h-[340px] w-full cursor-none overflow-hidden rounded-2xl border border-lime/15 bg-canopy sm:h-[400px]"
            style={{
              touchAction: 'none',
              backgroundImage:
                'radial-gradient(420px 200px at 50% -10%, rgba(164,232,102,0.16), transparent 65%)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 font-mono text-[13px]">
              <span className="rounded-full bg-canopy-2/85 px-3 py-1 text-banana">🍌 {score}</span>
              <span className="rounded-full bg-canopy-2/85 px-3 py-1 text-lime">{time}s</span>
            </div>

            {items.map((it) => (
              <span
                key={it.id}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-2xl sm:text-[27px]"
                style={{ left: `${it.x}%`, top: `${it.y}%` }}
                aria-hidden="true"
              >
                {EMOJI[it.type]}
              </span>
            ))}

            {pops.map((p) => {
              const k = p.t / POP_LIFE
              const color = p.value < 0 ? '#ff6f61' : p.value >= 2 ? '#ffc53d' : '#a4e866'
              return (
                <span
                  key={p.id}
                  className="font-display pointer-events-none absolute z-[15] -translate-x-1/2 -translate-y-1/2 select-none text-lg font-bold sm:text-xl"
                  style={{
                    left: `${p.x}%`,
                    top: `${CATCH_Y - POP_RISE * k}%`,
                    opacity: 1 - k,
                    color,
                    textShadow: '0 1px 6px rgba(0,0,0,0.45)',
                  }}
                  aria-hidden="true"
                >
                  {p.value > 0 ? `+${p.value}` : `−${Math.abs(p.value)}`}
                </span>
              )
            })}

            <span
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-[38px] sm:text-[44px]"
              style={{ left: `${basket}%`, top: `${CATCH_Y}%` }}
              aria-hidden="true"
            >
              🧺
            </span>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-forest/45">
            drag or use ← → · 🍌 +1 · ⭐ +2 · 🥥 −1
          </p>
        </div>
      )}

      {phase === 'over' && (
        <div className="px-7 py-9 text-center sm:px-9">
          <span className="text-4xl" aria-hidden="true">
            {score >= 22 ? '🏆' : '🍌'}
          </span>
          <h3 className="font-display mt-3 text-2xl text-forest sm:text-3xl">You caught {score}!</h3>
          <p className="mx-auto mt-2 max-w-sm text-forest-soft">{blurb}</p>
          <p className="mt-4 text-sm text-forest/65">
            And your message is safely with the troop — talk soon.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#calendly" onClick={handleClose} className="btn-j banana">
              Book a build call 🍌
            </a>
            <button type="button" onClick={start} className={secondaryBtn}>
              Play again
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
