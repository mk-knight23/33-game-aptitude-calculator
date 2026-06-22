import { useEffect, useState, type ReactNode } from 'react'

type MediaKind = 'video' | 'image'

interface CinematicBackgroundProps {
  /** Background image (also used as video poster and mobile/reduced-motion fallback). */
  image: string
  /** Optional looping video. Only used on desktop without reduced-motion when kind allows it. */
  video?: string
  /**
   * 'video' enables the looping video layer (hero / menu / results).
   * 'image' forces a static image (e.g. behind the active quiz timer loop) to avoid jank.
   */
  kind?: MediaKind
  children: ReactNode
}

/**
 * Layered cinematic background:
 *  1. base bg color (CSS)
 *  2. media (video on capable desktops, static image otherwise)
 *  3. theme-tinted dark gradient overlay
 *  4. scanline + grid + neon glow
 *  5. children (UI in neon glass panels)
 *
 * Visual layer only — no app logic.
 */
export function CinematicBackground({ image, video, kind = 'image', children }: CinematicBackgroundProps) {
  const [allowVideo, setAllowVideo] = useState(false)

  useEffect(() => {
    if (kind !== 'video' || !video) return
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia('(min-width: 768px)')

    const update = () => setAllowVideo(!motionQuery.matches && wideQuery.matches)
    update()

    motionQuery.addEventListener('change', update)
    wideQuery.addEventListener('change', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      wideQuery.removeEventListener('change', update)
    }
  }, [kind, video])

  return (
    <div className="cinematic-root">
      {allowVideo && video ? (
        <video
          className="cinematic-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img className="cinematic-media" src={image} alt="" aria-hidden="true" />
      )}

      <div className="cinematic-overlay" aria-hidden="true" />
      <div className="cinematic-scanlines" aria-hidden="true" />
      <div className="cinematic-grid" aria-hidden="true" />

      <div className="relative z-0">{children}</div>
    </div>
  )
}
