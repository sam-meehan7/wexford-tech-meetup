import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Episode`.
 */
export type EpisodeProps = SliceComponentProps<Content.EpisodeSlice>

/**
 * Component for "Episode" Slices.
 */
const Episode = ({ slice }: EpisodeProps): JSX.Element => {
  console.log(slice.primary)
  return (
    <div>
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.description} />
    </div>
  )
}

export default Episode
