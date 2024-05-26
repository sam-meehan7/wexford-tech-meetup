import Image from 'next/image'
import Link from 'next/link'

interface TeamMemberProps {
  name: string
  description: string
  imageSrc: string
  altText: string
}

export function TeamMember({
  name,
  description,
  imageSrc,
  altText,
}: TeamMemberProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300">
      <div className="flex aspect-square items-center justify-center bg-gray-100">
        <Image
          alt={altText}
          className="h-full w-full object-cover"
          height={300}
          src={imageSrc}
          style={{
            aspectRatio: '300/300',
            objectFit: 'cover',
          }}
          width={300}
        />
      </div>
      <div className="bg-white p-4 ">
        <div className="grid gap-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-500 ">{description}</p>
          <div className="flex items-center gap-2">
            <Link className="text-gray-500 hover:text-gray-900 " href="#">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-900 " href="#">
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="url(#gradient)"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f09433', stopOpacity: 1 }} />
          <stop offset="25%" style={{ stopColor: '#e6683c', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#dc2743', stopOpacity: 1 }} />
          <stop offset="75%" style={{ stopColor: '#cc2366', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#bc1888', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="url(#gradient)"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f09433', stopOpacity: 1 }} />
          <stop offset="25%" style={{ stopColor: '#e6683c', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#dc2743', stopOpacity: 1 }} />
          <stop offset="75%" style={{ stopColor: '#cc2366', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#bc1888', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
