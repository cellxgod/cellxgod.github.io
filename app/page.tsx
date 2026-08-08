'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ProfileCard from '@/components/profile-card'
import EntryOverlay from '@/components/entry-overlay'

const BioScene = dynamic(() => import('@/components/bio-scene'), { ssr: false })

export default function Page() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BioScene />
      {entered ? <ProfileCard /> : <EntryOverlay onEnter={() => setEntered(true)} />}
    </div>
  )
}
