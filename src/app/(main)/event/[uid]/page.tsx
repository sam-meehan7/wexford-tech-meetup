import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/prismicio'
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
      <article className="prose py-16 lg:py-36">
        <Container className="px-4 sm:px-6 lg:px-12">
          <div className="lg:px-8">
            <header className="mb-12">
              <div className="mb-4 text-4xl font-bold text-slate-900">
                <PrismicRichText
                  field={episode.data.slices[0]?.primary.title}
                />
              </div>
              <div className="order-first font-mono text-sm leading-7 text-slate-500">
                <PrismicRichText field={episode.data.slices[0]?.primary.date} />
              </div>
            </header>
            <div className="mb-6">
              <Image
                src={episode.data.slices[0]?.primary.image.url || ''}
                alt={
                  episode.data.slices[0]?.primary.image.alt || 'Episode Image'
                }
                width={
                  episode.data.slices[0]?.primary.image.dimensions?.width || 800
                }
                height={
                  episode.data.slices[0]?.primary.image.dimensions?.height ||
                  600
                }
                className="h-auto w-full rounded-lg shadow-md"
              />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Details</h2>
            <section className="mb-6 text-lg font-medium leading-8 text-slate-700">
              <PrismicRichText
                field={episode.data.slices[0]?.primary.description}
              />
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
      openGraph: {
        images: [
          {
            url: page.data.meta_image.url || 'default-image-url', // Provide a default URL
            width: page.data.meta_image.dimensions?.width,
            height: page.data.meta_image.dimensions?.height,
          },
        ],
      },
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return notFound()
  }
}
