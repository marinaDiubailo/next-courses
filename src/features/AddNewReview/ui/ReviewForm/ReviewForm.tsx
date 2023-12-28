import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { StarRating } from '@/shared/ui/StarRating';
import { Textarea } from '@/shared/ui/Textarea';
import cls from './ReviewForm.module.scss';

interface ReviewFormProps {
    className?: string;
    productId: string;
    isOpened: boolean;
}

export const ReviewForm = (props: ReviewFormProps) => {
    const { className, productId, isOpened } = props;
    console.log(productId, isOpened);

    return (
        <div className={classNames(cls.form, {}, [className])}>
            <Input />
            <Input />
            <div className={cls.rating}>
                <span>Оценка:</span>
                <StarRating selectedStars={2} />
            </div>
            <Textarea />
            <div className={cls.submit}>
                <Button variant="primary">Отправить</Button>
                <span>
                    * Перед публикацией отзыв пройдет предварительную модерацию
                    и проверку
                </span>
            </div>
        </div>
    );
};
