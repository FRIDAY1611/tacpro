'use client'

import { useState } from 'react'
import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  mainImage: string | null
  images: string[]
  alt: string
}

export function ProductGallery({ mainImage, images, alt }: ProductGalleryProps) {
  const allImages = mainImage ? [mainImage, ...images.filter(i => i !== mainImage)] : images
  const [selectedIndex, setSelectedIndex] = useState(0)

  const currentImage = allImages[selectedIndex] || null

  if (!currentImage) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <Shield className="w-32 h-32" />
        </div>
      </div>
    )
  }

  const isSvg = currentImage.endsWith('.svg')

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
        <img
          src={currentImage}
          alt={selectedIndex === 0 ? alt : `${alt} ${selectedIndex + 1}`}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            isSvg ? 'object-contain p-8' : 'object-cover'
          )}
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {allImages.slice(0, 10).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all',
                selectedIndex === i
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-gray-300'
              )}
            >
              <img
                src={img}
                alt=""
                className={cn(
                  'w-full h-full',
                  img.endsWith('.svg') ? 'object-contain p-1' : 'object-cover'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
