import { cache } from 'react'
import { createClient } from '@/prismicio'

import Link from 'next/link'

import { FormattedDate } from '@/components/FormattedDate'
import { PrismicRichText } from '@prismicio/react'

const getEpisodes = cache(async () => {
  const client = createClient()
  const pages = await client.getAllByType('episode')
  return pages
})

export default async function Episodes() {
  const episodes = await getEpisodes()
  console.log(episodes)
  // Log the slices and their contents for each episode
  episodes.forEach((episode) => {
    console.log(`Episode ID: ${episode.id}, Slices:`, episode.data.slices)
    episode.data.slices.forEach((slice) => {
      console.log(`Slice ID: ${slice.id}, Title:`, slice.primary.title)
      console.log(
        `Slice ID: ${slice.id}, Description:`,
        slice.primary.description,
      )
    })
  })

  return (
    <article className="bg-gray-50 py-16 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {episodes.map((episode) => (
          <div
            key={episode.uid}
            className="mb-12 rounded-lg bg-white p-6 shadow-lg"
          >
            <header className="flex flex-col">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <FormattedDate
                    date={new Date()}
                    className="order-first font-mono text-sm leading-7 text-slate-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col">
                <h1 className="mt-2 text-3xl font-bold text-slate-900 hover:text-indigo-600">
                  <Link href={`/${episode.uid}`}>
                    <PrismicRichText
                      field={episode.data.slices[0]?.primary.title}
                    />
                  </Link>
                </h1>
                <p className="mt-3 text-lg leading-8 text-slate-700">
                  <PrismicRichText
                    field={episode.data.slices[0]?.primary.description}
                  />
                </p>
              </div>
            </header>
            <hr className="my-8 border-gray-200" />
          </div>
        ))}
      </div>
    </article>
  )
}
