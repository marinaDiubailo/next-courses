import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ReviewItem.module.scss';

interface ReviewItemProps {
    className?: string;
}

export const ReviewItem = (props: ReviewItemProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls., {}, [className])}>
            
        </div>
    );
};
