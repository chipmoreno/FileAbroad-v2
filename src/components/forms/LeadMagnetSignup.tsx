'use client'

import { useState } from 'react'
import { Download, Check, Mail } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { trackConversionEvent } from '@/components/analytics/ConversionTracking'

interface LeadMagnetSignupProps {
  title: string
  description: string
  tagId?: string
  onSuccess?: () => void
  compact?: boolean
}

export default function LeadMagnetSignup({
  title,
  description,
  tagId,
  onSuccess,
  compact = false,
}: LeadMagnetSignupProps) {
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
        body: JSON.stringify({ email, tagId }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setMessage('Check your inbox for the download link.')
        setEmail('')
        trackConversionEvent('lead_magnet_signup', {
          site: 'fileabroad',
          page_path: window.location.pathname,
          tag_id: tagId || 'newsletter',
        })
        onSuccess?.()
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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <p className="font-semibold text-green-800">{message}</p>
        <p className="mt-1 text-sm text-green-600">
          If you don&apos;t see it, check your spam folder.
        </p>
      </div>
    )
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} data-analytics-form="true" data-form-name="lead-magnet" className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="lead-email" className="sr-only">Email address</label>
        <Input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          placeholder="Enter your email"
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap bg-secondary px-5 text-white hover:bg-secondary/90"
        >
          {status === 'loading' ? 'Sending...' : <><Download className="mr-2 h-4 w-4" /> Get the PDF</>}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-destructive">{message}</p>
        )}
      </form>
    )
  }

  return (
    <div className="rounded-xl border border-secondary/30 bg-background p-6 md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated">
          <Mail className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-sans text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    <form onSubmit={handleSubmit} data-analytics-form="true" data-form-name="lead-magnet" className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="lead-email" className="sr-only">Email address</label>
        <Input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          placeholder="Enter your email"
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap bg-secondary px-5 text-white hover:bg-secondary/90"
        >
          {status === 'loading' ? (
            'Sending...'
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Get the PDF
            </>
          )}
        </Button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-sm text-destructive">{message}</p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        No spam. Unsubscribe anytime. Your email is never shared.
      </p>
    </div>
  )
}
