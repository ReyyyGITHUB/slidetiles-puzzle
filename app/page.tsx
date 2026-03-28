'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ASSET_URLS = [
  '/images/slidingtiles-icon.png',
  '/globe.svg',
  '/next.svg',
  '/vercel.svg',
  '/window.svg',
  '/file.svg',
]

function preloadAssets(urls: string[], onProgress: (value: number) => void) {
  if (urls.length === 0) {
    onProgress(100)
    return Promise.resolve()
  }

  let loaded = 0
  const updateProgress = () => {
    loaded += 1
    onProgress(Math.round((loaded / urls.length) * 100))
  }

  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => {
            updateProgress()
            resolve()
          }
          img.onerror = () => {
            updateProgress()
            resolve()
          }
          img.src = url
        })
    )
  ).then(() => undefined)
}

export default function Home() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    preloadAssets(ASSET_URLS, setProgress)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      router.replace('/home')
    }
  }, [progress, router])

  return (
    <main className="relative min-h-screen w-full px-6 py-12 flex items-center justify-center bg-background">
      <section className="flex flex-col items-center text-center">
        {/* App icon image */}
        <div className="">
          <Image
            src="/images/slidingtiles-icon.png"
            alt="Sliding Tiles icon"
            width={250}
            height={250}
            priority
          />
        </div>

        {/* Title + subtitle matching the loading screen hierarchy */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl text-primary">Sliding Tiles</h1>
          <p className="label-archival opacity-60 text-primary">Finding Your Path</p>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="relative w-56 pt-4">
            {/* Label above */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 px-3 py-1 rounded-full bg-tertiary-container text-[10px] font-semibold shadow-lifted">
              {progress}%
            </div>
            {/* Thin progress bar below */}
            <div className="h-[2px] w-full bg-surface-variant/70 rounded-full" />
            <div
              className="absolute left-0 top-4 h-[2px] bg-primary-container rounded-full transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="body-text flex items-center gap-2">
            <Lock size={16}/>
            Secure Connection Established
          </p>
        </div>
      </section>
    </main>
  )
}
