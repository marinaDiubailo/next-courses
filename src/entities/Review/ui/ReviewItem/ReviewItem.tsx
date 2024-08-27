import UserIcon from '@/shared/assets/icons/user.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Devider, StarRating } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import cls from './ReviewItem.module.scss'

import { ReviewModel } from '../../model/types/review'

interface ReviewItemProps {
  className?: string
  review: ReviewModel
}

export const ReviewItem = (props: ReviewItemProps) => {
  const { className, review } = props
  const { createdAt, description, name, rating, title } = review

  return (
    <>
      <div className={classNames(cls.review, {}, [className])}>
        <Icon Svg={UserIcon} />
        <div className={cls.title}>
          <span className={cls['user-name']}>{name}:</span>
          &nbsp;&nbsp;
          <span>{title}</span>
        </div>
        <div className={cls.date}>
          {format(new Date(createdAt), 'dd MMMM yyyy', {
            locale: ru,
          })}
        </div>
        <div className={cls.rating}>
          <StarRating selectedStars={rating} />
        </div>
        <div className={cls.description}>{description}</div>
      </div>
      <Devider />
    </>
  )
}
