'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
        This is a group for anyone in the Wexford or SouthEast area interested
        in getting together to talk about Technology, Software Development,
        Internet and Web. We started this group to allow tech professionals to
        share ideas, concepts and knowledge.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
