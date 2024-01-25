import { useForm, Controller } from 'react-hook-form';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { StarRating } from '@/shared/ui/StarRating';
import { Textarea } from '@/shared/ui/Textarea';
import CloseIcon from '@/shared/assets/icons/close.svg';
import cls from './ReviewForm.module.scss';
import { IReviewForm } from '../../model/types/reviewForm';

interface ReviewFormProps {
    className?: string;
    productId: string;
    isOpened: boolean;
}

export const ReviewForm = (props: ReviewFormProps) => {
    const { className, productId, isOpened } = props;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<IReviewForm>();

    const submitHandler = (data: IReviewForm) => {
        //console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className={classNames(cls.form, {}, [className])}>
                <Input
                    placeholder="Имя"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Заполните имя',
                        },
                    })}
                    error={errors.name}
                />
                <Input
                    className={cls.title}
                    placeholder="Заголовок отзыва"
                    {...register('title', {
                        required: {
                            value: true,
                            message: 'Заполните заголовок',
                        },
                    })}
                    error={errors.title}
                />
                <div className={cls.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <StarRating
                                isEditable
                                selectedStars={field.value}
                                onSelect={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Укажите рейтинг',
                            },
                        }}
                    />
                </div>
                <Textarea
                    className={cls.description}
                    placeholder="Текст отзыва"
                    {...register('description', {
                        required: {
                            value: true,
                            message: 'Заполните текст отзыва',
                        },
                    })}
                    error={errors.description}
                />
                <div className={cls.submit}>
                    <Button variant="primary">Отправить</Button>
                    <span className={cls.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            <div className={cls.success}>
                <span className={cls['success-title']}>
                    Ваш отзыв отправлен.
                </span>
                <span>
                    Спасибо, Ваш отзыв будет опубликован после проверки.
                </span>
                <CloseIcon className={cls.close} />
            </div>
        </form>
    );
};
