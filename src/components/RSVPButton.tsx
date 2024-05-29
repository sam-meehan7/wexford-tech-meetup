import React from 'react'

interface RSVPButtonProps {
  link: string
}

const RSVPButton: React.FC<RSVPButtonProps> = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-md bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-6 py-3 font-bold text-white no-underline"
    >
      RSVP
    </a>
  )
}

export default RSVPButton
