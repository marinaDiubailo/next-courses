/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef, useRef, useState } from 'react'

import { ProductCard, ProductModel } from '@/entities/Product'
import { ReviewList } from '@/entities/Review'
import { ReviewForm } from '@/features/AddNewReview'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui'
import { motion } from 'framer-motion'

import cls from './TopPageProduct.module.scss'

interface TopPageProductProps {
  className?: string
  product: ProductModel
}

export const TopPageProduct = motion(
  forwardRef((props: TopPageProductProps, ref: ForwardedRef<HTMLLIElement>) => {
    const { className, product } = props
    const [isReviewOpened, setIsReviewOpened] = useState(false)
    const [addonDown, setAddonDown] = useState(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const reviewsHandler = () => {
      setIsReviewOpened(prev => !prev)
      setAddonDown(prev => !prev)
    }

    const variants = {
      hidden: { height: 0, opacity: 0 },
      visible: { height: 'auto', opacity: 1 },
    }

    const scrollToReview = () => {
      setIsReviewOpened(true)
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      reviewRef.current?.focus({ preventScroll: true })
    }

    const mods: Mods = {
      [cls.closed]: !isReviewOpened,
      [cls.opened]: isReviewOpened,
    }

    return (
      <li className={classNames('', {}, [className])} ref={ref}>
        <ProductCard
          addonDown={addonDown}
          isReviewOpened={isReviewOpened}
          onClick={reviewsHandler}
          onRatingTitleClick={scrollToReview}
          product={product}
        />
        <motion.div
          animate={isReviewOpened ? 'visible' : 'hidden'}
          initial={'hidden'}
          variants={variants}
        >
          <Card
            className={classNames(cls.reviews, mods)}
            color={'secondary'}
            ref={reviewRef}
            tabIndex={isReviewOpened ? 0 : -1}
          >
            <ReviewList reviews={product.reviews} />
            {isReviewOpened && <ReviewForm isOpened={isReviewOpened} productId={product._id} />}
          </Card>
        </motion.div>
      </li>
    )
  })
)

TopPageProduct.displayName = 'TopPageProduct'
