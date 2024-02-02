import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { StarRating } from '@/shared/ui/StarRating';
import { Textarea } from '@/shared/ui/Textarea';
import CloseIcon from '@/shared/assets/icons/close.svg';
import cls from './ReviewForm.module.scss';
import { IReviewForm, IReviewSentResponse } from '../../model/types/reviewForm';
import { API } from '@/shared/api/api';
import { useState } from 'react';

interface ReviewFormProps {
    className?: string;
    productId: string;
    isOpened: boolean;
}

export const ReviewForm = (props: ReviewFormProps) => {
    const { className, productId, isOpened } = props;

    const [error, setError] = useState<string>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<IReviewForm>();

    const submitHandler = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(
                API.review.createDemo,
                {
                    ...formData,
                    productId,
                },
            );

            if (data.message) {
                setIsSuccess(true);
                reset();
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(
                    'Что-то пошло не так, попробуйте отправить отзыв снова.',
                );
            }
        }
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
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
                                setRating={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-label="Текст отзыва"
                    aria-invalid={!!errors.description}
                />
                <div className={cls.submit}>
                    <Button
                        variant="primary"
                        tabIndex={isOpened ? 0 : -1}
                        onClick={() => clearErrors()}
                    >
                        Отправить
                    </Button>
                    <span className={cls.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            {isSuccess && (
                <div
                    className={classNames(cls.panel, {}, [cls.success])}
                    role="alert"
                >
                    <span className={cls['success-title']}>
                        Ваш отзыв отправлен.
                    </span>
                    <span>
                        Спасибо, Ваш отзыв будет опубликован после проверки.
                    </span>
                    <button
                        type="button"
                        className={cls.close}
                        onClick={() => setIsSuccess(false)}
                        aria-label="Закрыть оповещение"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}

            {error && (
                <div
                    className={classNames(cls.panel, {}, [cls.error])}
                    role="alert"
                >
                    {error}
                    <button
                        type="button"
                        className={cls.close}
                        onClick={() => setError(undefined)}
                        aria-label="Закрыть оповещение"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
        </form>
    );
};
