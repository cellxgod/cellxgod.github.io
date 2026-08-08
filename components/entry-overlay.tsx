'use client'

export default function EntryOverlay({ onEnter }: { onEnter: () => void }) {
  return (
    <button
      type="button"
      onClick={onEnter}
      className="fixed inset-0 z-50 flex h-screen w-full cursor-pointer flex-col items-center justify-center gap-4 bg-background transition-opacity duration-500"
      aria-label="Enter site"
    >
      <span className="text-shimmer font-sans text-2xl font-bold tracking-widest sm:text-4xl">
        WELCOME TO CYAN'S LOL
      </span>
      <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        TAP TO ENTER
      </span>
    </button>
  )
}
