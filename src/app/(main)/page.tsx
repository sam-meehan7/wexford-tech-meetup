import { cache } from 'react'
import { createClient } from '@/prismicio'
import type { Metadata } from 'next'

import Link from 'next/link'

import { FormattedDate } from '@/components/FormattedDate'
import { PrismicRichText } from '@prismicio/react'

const getEpisodes = cache(async () => {
  const client = createClient()
  const pages = await client.getAllByType('episode')
  return pages
})

export const metadata: Metadata = {
  title: 'Wexford Tech Meetup',
  description:
    'This is a group for anyone in the Wexford or SouthEast area interested in getting together to talk about Technology, Software Development, Internet and Web. We started this group to allow tech professionals to share ideas, concepts and knowledge.',
}

export default async function Episodes() {
  const episodes = await getEpisodes()
  return (
    <article className="py-16 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {episodes.map((episode) => (
          <div
            key={episode.uid}
            className="mb-12 rounded-lg bg-white p-6 shadow-2xl"
          >
            <header className="flex flex-col">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <div className="order-first font-mono text-sm leading-7 text-slate-500">
                    <PrismicRichText
                      field={episode.data.slices[0]?.primary.date}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <div className="hover:gradient-text mt-2 text-3xl font-bold text-slate-900">
                  <Link href={`/event/${episode.uid}`}>
                    <PrismicRichText
                      field={episode.data.slices[0]?.primary.title}
                    />
                  </Link>
                </div>
                <div className="mt-3 text-lg leading-8 text-slate-700">
                  <PrismicRichText
                    field={episode.data.slices[0]?.primary.summary}
                  />
                </div>
              </div>
            </header>
            <hr className="my-8 border-gray-200" />
          </div>
        ))}
      </div>
    </article>
  )
}
