/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import ImagePlaceholder from '@/shared/assets/icons/placeholder.svg'
import VectorIcon from '@/shared/assets/icons/vector.svg'
import { numDeclination, priceRu } from '@/shared/lib/util'
import { Button, Card, Devider, HTag, StarRating, Tag, Text } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'
import clsx from 'clsx'

import s from './ProductCard.module.scss'

import { ProductModel } from '../../model/types/product'

type Props = {
  addonDown: boolean
  className?: string
  isReviewOpened: boolean
  onClick: () => void
  onRatingTitleClick: () => void
  product: ProductModel
}

export const ProductCard: React.FC<Props> = props => {
  const { addonDown, className, isReviewOpened, onClick, onRatingTitleClick, product } = props
  const [imgError, setImgError] = useState(false)
  const ratingTitleClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    onRatingTitleClick()
  }

  const handleError = () => {
    setImgError(true)
  }

  return (
    <Card className={clsx(s.productCard, className)}>
      <div className={s.logo}>
        {!imgError ? (
          <img
            alt={product.title}
            className={s.img}
            height={70}
            onError={handleError}
            src={product.image}
            width={70}
          />
        ) : (
          <ImagePlaceholder className={s.img} height={70} width={70} />
        )}
      </div>
      <HTag className={s.title} tag={'h3'}>
        {product.title}
      </HTag>
      <div className={s.price}>
        <span className={'visualy-hidden'}>цена</span>
        {priceRu(product.price)}
        {product.oldPrice && (
          <Tag className={s.oldPrice} color={'green'}>
            <span className={'visualy-hidden'}>скидка</span>
            {priceRu(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={s.credit}>
        <span className={'visualy-hidden'}>кредит</span>
        {priceRu(product.credit)}/<span className={s.month}>мес</span>
      </div>
      <div className={s.rating}>
        <span className={'visualy-hidden'}>
          {'рейтинг' + product.reviewAvg ?? product.initialRating}
        </span>
        <StarRating selectedStars={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={s.tags}>
        {product.categories.map(category => (
          <Tag className={s.category} color={'ghost'} key={category} size={'m'}>
            {category}
          </Tag>
        ))}
      </div>
      <div aria-hidden className={s.priceTitle}>
        цена
      </div>
      <div aria-hidden className={s.creditTitle}>
        в кредит
      </div>
      <div className={s.rateTitle} onClick={e => ratingTitleClickHandler(e)}>
        <a href={'#ref'}>
          {product.reviewCount}{' '}
          {numDeclination(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </a>
      </div>
      <Devider className={s.hr} />
      <Text className={s.description}>{product.description}</Text>
      <div className={s.features}>
        {product.characteristics.map(characteristic => (
          <div className={s.characteristic} key={characteristic.name}>
            <span className={s.characteristicName}>{characteristic.name}</span>
            <span className={s.characteristicDots} />
            <span className={s.characteristicValue}>{characteristic.value}</span>
          </div>
        ))}
      </div>
      <div className={s.specifics}>
        {product.advantages && (
          <div className={s.advantges}>
            <h4 className={s.specificsTitle}>Преимущества</h4>
            <Text className={s.text}>{product.advantages}</Text>
          </div>
        )}
        {product.disAdvantages && (
          <div className={s.disadvantges}>
            <h4 className={s.specificsTitle}>Недостатки</h4>
            <Text className={s.text}>{product.disAdvantages}</Text>
          </div>
        )}
      </div>
      <Devider className={clsx(s.hr, s.hr2)} />
      <div className={s.actions}>
        <Button as={'a'} href={product.link} target={'_blank'}>
          Узнать подробнее
        </Button>
        <Button
          addon={<Icon Svg={VectorIcon} />}
          addonDown={addonDown}
          aria-expanded={isReviewOpened}
          onClick={onClick}
          variant={'ghost'}
        >
          Читать отзывы
        </Button>
      </div>
    </Card>
  )
}
