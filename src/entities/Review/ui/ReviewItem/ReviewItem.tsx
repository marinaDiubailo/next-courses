import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { classNames } from '@/shared/lib/classNames/classNames';
import UserIcon from '@/shared/assets/icons/user.svg';
import { Icon } from '@/shared/ui/Icon';
import { StarRating } from '@/shared/ui/StarRating';
import { ReviewModel } from '../../model/types/review';
import cls from './ReviewItem.module.scss';

interface ReviewItemProps {
    className?: string;
    review: ReviewModel;
}

export const ReviewItem = (props: ReviewItemProps) => {
    const { className, review } = props;
    const { name, title, rating, description, createdAt } = review;

    return (
        <div className={classNames(cls.review, {}, [className])}>
            <Icon Svg={UserIcon} />
            <div className={cls.title}>
                <span className={cls['user-name']}>{name}:</span>&nbsp;&nbsp;
                <span>{title}</span>
            </div>
            <div className={cls.date}>
                {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
            </div>
            <div className={cls.rating}>
                <StarRating selectedStars={rating} />
            </div>
            <div className={cls.description}>{description}</div>
        </div>
    );
};
