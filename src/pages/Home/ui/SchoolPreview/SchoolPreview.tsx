/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import ImagePlaceholder from '@/shared/assets/icons/placeholder.svg'
import { Button, Card } from '@/shared/ui'
import Link from 'next/link'

import s from './SchoolPreview.module.scss'

type Props = {
  link: string
  logo: string
  name: string
}
export const SchoolPreview: React.FC<Props> = ({ link, logo, name }) => {
  const [imgError, setImgError] = useState(false)

  const handleError = () => {
    setImgError(true)
  }

  return (
    <Card className={s.root}>
      <div className={s.container}>
        {!imgError ? (
          <img
            alt={name}
            className={s.img}
            height={70}
            onError={handleError}
            src={logo}
            width={70}
          />
        ) : (
          <ImagePlaceholder className={s.img} height={70} width={70} />
        )}
        <span className={s.name}>{name}</span>
      </div>
      <Button as={Link} href={link} rel={'noreferrer noopener'} target={'_blank'}>
        Подробнее о школе
      </Button>
    </Card>
  )
}
