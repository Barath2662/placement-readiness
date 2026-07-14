import { createAvatar } from '@dicebear/core'
import { micah } from '@dicebear/collection'
import Image from 'next/image'

interface AvatarProps {
  seed: string
  size?: number
  className?: string
}

export default function Avatar({ seed, size = 32, className = '' }: AvatarProps) {
  const avatar = createAvatar(micah, {
    seed,
    size,
    // Add slightly softer colors for the golden theme
    backgroundColor: ['050505', '0a0a0a', '1a1500'],
  })

  // Convert the SVG to a data URI
  const dataUri = avatar.toDataUri()

  return (
    <Image
      src={dataUri}
      alt={`${seed}'s avatar`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      unoptimized
    />
  )
}
