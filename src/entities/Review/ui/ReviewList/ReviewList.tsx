import { ReviewModel } from '../../model/types/review'
import { ReviewItem } from '../ReviewItem/ReviewItem'
interface ReviewListProps {
  className?: string
  reviews: ReviewModel[]
}

export const ReviewList = (props: ReviewListProps) => {
  const { reviews } = props

  return (
    <>
      {reviews.map(review => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </>
  )
}
