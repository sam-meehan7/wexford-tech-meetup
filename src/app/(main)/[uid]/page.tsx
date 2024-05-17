import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createClient } from '@/prismicio'
import { FormattedDate } from '@/components/FormattedDate'

import { Container } from '@/components/Container'

import { PrismicRichText } from '@prismicio/react'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  try {
    const episode = await client.getByUID('episode', params.uid)
    if (!episode) {
      return notFound()
    }
    return (
      <article className="bg-gray-50 py-16 lg:py-36">
        <Container>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <header className="mb-12">
              <div className="mb-4 text-4xl font-bold text-slate-900">
                <PrismicRichText
                  field={episode.data.slices[0]?.primary.title}
                />
              </div>
              <FormattedDate
                date={new Date()}
                className="font-mono text-sm leading-7 text-slate-500"
              />
            </header>
            <section>
              <div className="mb-6 text-lg font-medium leading-8 text-slate-700">
                <PrismicRichText
                  field={episode.data.slices[0]?.primary.description}
                />
              </div>
            </section>
            <hr className="my-12 border-gray-200" />
          </div>
        </Container>
      </article>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    return notFound()
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  try {
    const page = await client.getByUID('episode', params.uid)
    if (!page) {
      return notFound()
    }
    return {
      title: page.data.meta_title,
      description: page.data.meta_description,
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return notFound()
  }
}
