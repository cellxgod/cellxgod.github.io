'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ProfileCard from '@/components/profile-card'
import EntryOverlay from '@/components/entry-overlay'

const BioScene = dynamic(
  () => import('@/components/bio-scene'),
  {
    ssr: false,
  }
)

export default function Page() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0713]">

      {/* Persistent WebGL background */}
      <BioScene />

      {/* UI layer */}
      <div className="relative z-20">

        {/* Entry screen fades away instead of disappearing */}
        <div
          className={`transition-opacity duration-500 ${
            entered
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }`}
        >
          <EntryOverlay
            onEnter={() => setEntered(true)}
          />
        </div>

        {/* Profile appears above the persistent scene */}
        {entered && <ProfileCard />}

      </div>
    </div>
  )
}
