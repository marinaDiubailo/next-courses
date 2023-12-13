import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import cls from './ReviewList.module.scss';

interface ReviewListProps {
    className?: string;
    isReviewOpened: boolean;
}

export const ReviewList = (props: ReviewListProps) => {
    const { className, isReviewOpened } = props;

    const mods: Mods = {
        [cls.opened]: isReviewOpened,
        [cls.closed]: !isReviewOpened,
    };
    return (
        <Card
            className={classNames(cls.review, mods, [className])}
            color="blue"
        >
            vk
        </Card>
    );
};
