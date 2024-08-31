import type { FC } from 'react'

import { User } from '@/shared/assets/icons'
import { Devider, StarRating } from '@/shared/ui'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import s from './ReviewItem.module.scss'

import { ReviewModel } from '../../model/types/review'

type Props = {
  review: ReviewModel
}

export const ReviewItem: FC<Props> = ({ review }) => {
  const { createdAt, description, name, rating, title } = review

  return (
    <>
      <div className={s.review}>
        <User />
        <div className={s.title}>
          <span className={s.userName}>{name}:</span>
          &nbsp;&nbsp;
          <span>{title}</span>
        </div>
        <div className={s.date}>
          {format(new Date(createdAt), 'dd MMMM yyyy', {
            locale: ru,
          })}
        </div>
        <div className={s.rating}>
          <StarRating selectedStars={rating} />
        </div>
        <div className={s.description}>{description}</div>
      </div>
      <Devider />
    </>
  )
}
