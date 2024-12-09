import { useEffect, useState } from 'react'

import Post1 from '@/shared/assets/images/slideshow/post1.jpg'
import Post2 from '@/shared/assets/images/slideshow/post2.jpg'
import Post3 from '@/shared/assets/images/slideshow/post3.jpg'
import clsx from 'clsx'
import Image from 'next/image'

import s from './ImageSlideshow.module.scss'

const images = [Post1, Post3, Post2]

export const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={s.slideshow}>
      {images.map((image, idx) => (
        <Image
          alt={'Slide ' + (idx + 1)}
          className={clsx(idx === currentImageIndex && s.active)}
          fill
          key={idx}
          priority
          src={image}
        />
      ))}
    </div>
  )
}
