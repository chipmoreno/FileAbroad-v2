'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X, MessageCircle } from '@/components/icons'
import { useState, useEffect } from 'react'

export default function StickyCTABar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false)

  // Only show on content pages
  const showOnPaths = ['/blog/', '/guides/', '/countries/', '/forms/', '/personas/', '/state-taxes/', '/resources/']
  const normalizedPathname = pathname?.replace(/^\/(?:es|pt|fr|de|it|nl|ja|zh)(?=\/)/, '')
  const shouldShow = showOnPaths.some((path) => normalizedPathname?.startsWith(path))

  useEffect(() => {
    if (!shouldShow) return

    let frame = 0
    try {
      frame = window.requestAnimationFrame(() => {
        if (window.sessionStorage.getItem('fileabroad_sticky_cta_dismissed') === '1') {
          setIsDismissed(true)
        }
      })
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }

    return () => window.cancelAnimationFrame(frame)
  }, [shouldShow])

  useEffect(() => {
    if (!shouldShow || isDismissed) return

    // Show after user has scrolled down a bit (5 seconds delay or 500px scroll)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldShow, isDismissed])

  useEffect(() => {
    if (!shouldShow || isDismissed) return

    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY > 0 || event.relatedTarget !== null) return
      try {
        if (window.sessionStorage.getItem('fileabroad_exit_intent_seen') === '1') return
        window.sessionStorage.setItem('fileabroad_exit_intent_seen', '1')
      } catch {
        // Continue with the in-memory guard below when storage is unavailable.
      }
      setIsExitIntentOpen(true)
      setIsVisible(true)
    }

    document.addEventListener('mouseout', handleExitIntent)
    return () => document.removeEventListener('mouseout', handleExitIntent)
  }, [shouldShow, isDismissed])

  if (!isVisible || isDismissed) return null

  function dismiss() {
    try {
      window.sessionStorage.setItem('fileabroad_sticky_cta_dismissed', '1')
    } catch {
      // The in-memory dismissal still applies for this render.
    }
    setIsDismissed(true)
    setIsExitIntentOpen(false)
  }

  return (
    <>
      {isExitIntentOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/60 px-6" role="dialog" aria-modal="true" aria-labelledby="exit-intent-title">
          <div className="relative max-w-lg rounded-lg border border-border bg-background p-8 shadow-2xl">
            <button type="button" onClick={() => setIsExitIntentOpen(false)} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted" aria-label="Close consultation prompt">
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Before you go</p>
            <h2 id="exit-intent-title" className="mt-3 font-sans text-3xl font-bold text-foreground">Are You Sure You Know What You Owe?</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Most expats either overpay by thousands or miss a form that triggers penalties. I review your situation personally and reply within one business day. No tax documents here — just the facts.</p>
            <Link href="/intake" onClick={() => setIsExitIntentOpen(false)} className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-foreground">Reach Out About Your Filing</Link>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/96 shadow-[0_-16px_40px_rgba(15,29,50,0.12)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-3 [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted sm:flex">
            <MessageCircle className="h-5 w-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Unsure about your expat filing situation?
            </p>
            <p className="text-xs text-muted-foreground">
              Reach out and I will personally review your facts. No tax documents here.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent("Hi Chip — I saw your site and have a question about my filing situation. [FA-MOBILE]")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#128C7E]"
          >
            WhatsApp Chip
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      </div>
    </>
  )
}
