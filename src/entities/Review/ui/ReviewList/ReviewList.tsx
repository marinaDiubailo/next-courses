import type { FC } from 'react'

import { ReviewModel } from '../../model/types/review'
import { ReviewItem } from '../ReviewItem/ReviewItem'

type Props = {
  reviews: ReviewModel[]
}

export const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <>
      {reviews.map(review => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </>
  )
}
