import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { ReviewModel } from '../../model/types/review';
import { ReviewItem } from '../ReviewItem/ReviewItem';
import cls from './ReviewList.module.scss';

interface ReviewListProps {
    className?: string;
    isReviewOpened: boolean;
    reviews: ReviewModel[];
}

export const ReviewList = (props: ReviewListProps) => {
    const { className, isReviewOpened, reviews } = props;

    const mods: Mods = {
        [cls.opened]: isReviewOpened,
        [cls.closed]: !isReviewOpened,
    };
    return (
        <Card
            className={classNames(cls.reviews, mods, [className])}
            color="blue"
        >
            {reviews.map((review) => (
                <ReviewItem key={review._id} review={review} />
            ))}
        </Card>
    );
};
