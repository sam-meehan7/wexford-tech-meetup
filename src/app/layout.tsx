import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Wexford Tech Meetup',
    default:
      'Wexford Tech Meetup - This is a group for anyone in the Wexford or SouthEast area interested in getting together to talk about Technology.',
  },
  description:
    'This is a group for anyone in the Wexford or SouthEast area interested in getting together to talk about Technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </head>
      <body className="flex min-h-full">
        <div className="w-full">{children}</div>
      </body>
    </html>
  )
}
