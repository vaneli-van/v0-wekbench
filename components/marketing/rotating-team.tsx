'use client'

import { useState, useEffect } from 'react'

const teamRoles = [
  'procurement',
  'sales manager',
  'quotation manager',
  'vendor manager',
  'supply chain manager',
  'operations manager',
]

export function RotatingTeam() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex)
      setCurrentIndex((prev) => (prev + 1) % teamRoles.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <section className="border-y border-border bg-gradient-to-r from-background via-primary/5 to-background py-16 sm:py-20 lg:py-24">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .slide-down {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Your{' '}
            <span className="inline-block min-w-[240px] h-[1.2em] relative">
              <span 
                key={`current-${currentIndex}`} 
                className="absolute left-0 right-0 top-0 text-primary font-bold slide-up"
              >
                {teamRoles[currentIndex]}
              </span>
            </span>
            {' '}team&apos;s
          </h2>
          <p className="mt-4 text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            Workflow Execution Kit — That&apos;s{' '}
            <span className="text-black font-bold">
              wek<span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">-</span>bench
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
