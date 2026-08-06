'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { trackConversionEvent } from '@/components/analytics/ConversionTracking'

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setCookie('kit_subscribed', 'true', 365)
        setStatus('success')
        setMessage("You're on the newsletter list.")
        setEmail('')
        trackConversionEvent('newsletter_signup', {
          site: 'fileabroad',
          page_path: window.location.pathname,
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Connection error. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-16 px-6">
        <div role="status" aria-live="polite" className="max-w-xl mx-auto text-center bg-green-50 border border-green-200 rounded-xl p-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-green-800 font-semibold text-lg">{message}</p>
          <p className="text-green-600 text-sm mt-1">
            You may receive occasional tax updates or filing reminders. There is no automated email series.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="border-y border-border bg-surface-elevated px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 border-l-4 border-secondary bg-card p-7 md:grid-cols-[1fr_1.1fr] md:p-10">
          <div>
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-sans text-2xl font-bold text-foreground">
                The FileAbroad Brief
              </h3>
              <p className="text-sm mt-1 text-muted-foreground">
                Get the 2026 Expat Filing Deadline Calendar — FEIE limits, FBAR dates, and extension rules on one page. Occasional updates after that; no automated sequence.
              </p>
            </div>
          </div>
          </div>

          <div className="self-center">
          <form onSubmit={handleSubmit} data-analytics-form="true" data-form-name="newsletter" className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
              placeholder="Email address"
              required
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="whitespace-nowrap bg-primary px-5 text-white hover:bg-foreground"
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {status === 'error' && (
            <p role="status" aria-live="polite" className="text-destructive text-sm mt-2">{message}</p>
          )}

          <p className="text-xs mt-3 text-muted-foreground">
            Occasional filing updates. Unsubscribe anytime. No tax details are collected here.
          </p>
          </div>
        </div>
      </div>
    </section>
  )
}
