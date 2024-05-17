import { createClient } from '@/prismicio'
import { log } from 'console'

export interface Episode {
  id: string
  title: any // PrismicRichText field, so it's a complex structure
  description: any // PrismicRichText field, so it's a complex structure
}

export async function getAllEpisodes(): Promise<Episode[]> {
  const client = createClient()

  const episodesResponse = await client.getAllByType('episode') // Replace "episode" with your actual type ID

  const episodes = episodesResponse.map((doc) => {
    // Directly passing the PrismicRichText fields
    const title = doc.data
    const description = doc.data
    console.log(title)

    return {
      id: doc.id,
      title,
      description,
    }
  })

  return episodes
}
