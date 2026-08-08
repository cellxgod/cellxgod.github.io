'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, MapPin, BadgeCheck } from 'lucide-react'
import {
  InstagramIcon,
  GithubIcon,
  SpotifyIcon,
  YoutubeIcon,
  TwitchIcon,
} from '@/components/brand-icons'

const BIO_TEXT = 'THE ONE BEHIND EVERYTHING'

const SOCIALS = [
  {
    name: 'Instagram',
    icon: InstagramIcon,
    href: 'https://instagram.com/cellxgod',
    handle: '@cellxgod',
  },
  {
    name: 'GitHub',
    icon: GithubIcon,
    href: 'https://github.com/cellxgod',
    handle: 'cellxgod',
  },
  {
    name: 'Spotify',
    icon: SpotifyIcon,
    href: 'https://open.spotify.com/user/31duzxe26jysusaouhcwik26hvve?si=d5ZuSm2PTTS2iD4iXI20CA&utm_source=copy-link&sci=spotify%3Acard-config%3A5dbWFVxYCGIlZKdMmZwf4k',
    handle: 'cellxgod',
  },
  {
    name: 'YouTube',
    icon: YoutubeIcon,
    href: 'https://www.youtube.com/channel/UCTXBbbD0OpzqaCA3WRJRXQQ',
    handle: 'YouTube',
  },
  {
    name: 'Twitch',
    icon: TwitchIcon,
    href: 'https://m.twitch.tv/iamvellex?desktop-redirect=true',
    handle: 'iamvellex',
  },
]

function useTypewriter(text: string, speed = 45) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0

    const id = setInterval(() => {
      i += 1
      setDisplay(text.slice(0, i))

      if (i >= text.length) {
        clearInterval(id)
      }
    }, speed)

    return () => clearInterval(id)
  }, [text, speed])

  return display
}

export default function ProfileCard() {
  const typedBio = useTypewriter(BIO_TEXT)
  const [views, setViews] = useState(1337)

  useEffect(() => {
    const id = setInterval(() => {
      setViews((v) => v + Math.floor(Math.random() * 3))
    }, 4000)

    return () => clearInterval(id)
  }, [])

  return (
    <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10">
      <div className="glass animate-fade-up animate-glow-pulse w-full max-w-md rounded-3xl p-6 sm:p-8">

        {/* views */}
        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
            <Eye className="size-3.5" aria-hidden="true" />
            <span className="tabular-nums">{views.toLocaleString()}</span>
            <span className="sr-only">profile views</span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            the void
          </span>
        </div>

        {/* avatar + name */}
        <div className="flex flex-col items-center text-center">
          <div className="animate-float-slow relative">
            <div
              className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-70 blur-md"
              aria-hidden="true"
            />

            <Image
              src="/images/avatar.png"
              alt="Profile avatar"
              width={112}
              height={112}
              priority
              className="relative size-28 rounded-full border-2 border-primary/60 object-cover"
            />
          </div>

          <h1 className="text-shimmer mt-4 flex items-center gap-2 font-sans text-3xl font-bold tracking-tight">
            CYAN
            <BadgeCheck
              className="size-6 shrink-0 text-accent"
              aria-label="verified"
            />
          </h1>

          <p className="mt-1 font-mono text-xs font-semibold tracking-[0.2em] text-primary/80">
            CELLXGOD
          </p>

          <p className="mt-3 min-h-6 font-mono text-sm text-muted-foreground">
            {typedBio}
            <span className="cursor-blink text-primary">_</span>
          </p>
        </div>

        {/* socials */}
        <nav
          aria-label="Social links"
          className="mt-7 grid grid-cols-3 gap-3"
        >
          {SOCIALS.map(({ name, icon: Icon, href }, i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
              className={`animate-fade-up group flex aspect-square items-center justify-center rounded-2xl border border-border bg-secondary/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/15 hover:shadow-[0_0_20px_oklch(0.62_0.25_300/40%)] ${
                name === 'Twitch' ? 'col-start-3' : ''
              }`}
              style={{ animationDelay: `${0.35 + i * 0.06}s` }}
            >
              <Icon
                className="size-5 text-muted-foreground transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />

              <span className="sr-only">{name}</span>
            </a>
          ))}
        </nav>

        {/* footer */}
        <p className="mt-7 text-center font-mono text-xs text-muted-foreground/70">
          CELLXGOD &middot; est. 2026
        </p>
      </div>
    </main>
  )
        }
