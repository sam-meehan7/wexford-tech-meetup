import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/prismicio'
import { Container } from '@/components/Container'
import { PrismicRichText } from '@prismicio/react'
import RSVPButton from '@/components/RSVPButton'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  try {
    const episode = await client.getByUID('episode', params.uid)
    if (!episode) {
      return notFound()
    }

    // Get the current date
    const currentDate = new Date()

    // Check if the date field is defined and is an array
    const dateArray = episode.data.slices[0]?.primary.date
    if (!Array.isArray(dateArray) || dateArray.length === 0) {
      console.error('Date is not defined or not an array:', dateArray)
      return notFound()
    }

    let dateString = ''
    if (dateArray[0] && 'text' in dateArray[0]) {
      dateString = dateArray[0].text
    } else {
      console.error('Expected a text node, but got:', dateArray[0])
      return notFound()
    }

    // Convert the current date to a string in 'yyyy-mm-dd' format
    const currentDateString = currentDate.toISOString().split('T')[0]

    // Convert the event date to a Date object
    const eventDate = new Date(dateString)

    // Adjust the date to the local timezone
    const timezoneOffset = eventDate.getTimezoneOffset() * 60000 //offset in milliseconds
    const localISOTime = new Date(eventDate.getTime() - timezoneOffset)
      .toISOString()
      .split('T')[0]

    // Convert the event date to a string in 'yyyy-mm-dd' format
    const eventDateString = eventDate.toISOString().split('T')[0]

    console.log('today: ' + currentDateString)
    console.log('event date: ' + eventDateString)

    // Determine if the event date is today or in the future
    const isFutureEvent = localISOTime >= currentDateString

    console.log(isFutureEvent)

    return (
      <article className="py-16 lg:py-36">
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
            <div className="prose mb-6">
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
              {isFutureEvent && (
                <RSVPButton link="https://www.meetup.com/wexford-tech-meetup/events/?type=upcoming" />
              )}
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Details</h2>
            <section className="mb-6 text-lg font-medium leading-8 text-slate-700">
              <PrismicRichText
                field={episode.data.slices[0]?.primary.description}
              />
            </section>
            <hr className="my-12 border-gray-200" />
            {isFutureEvent && (
              <RSVPButton link="https://www.meetup.com/wexford-tech-meetup/events/?type=upcoming" />
            )}
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
