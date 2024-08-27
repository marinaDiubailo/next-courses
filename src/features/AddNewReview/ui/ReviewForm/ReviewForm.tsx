import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import CloseIcon from '@/shared/assets/icons/close.svg'
import { API } from '@/shared/consts/api'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, Input, StarRating, Textarea } from '@/shared/ui'
import axios from 'axios'

import cls from './ReviewForm.module.scss'

import { IReviewForm, IReviewSentResponse } from '../../model/types/reviewForm'

interface ReviewFormProps {
  className?: string
  isOpened: boolean
  productId: string
}

export const ReviewForm = (props: ReviewFormProps) => {
  const { className, isOpened, productId } = props

  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IReviewForm>()

  const submitHandler = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
        ...formData,
        productId,
      })

      if (data.message) {
        setIsSuccess(true)
        reset()
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Что-то пошло не так, попробуйте отправить отзыв снова.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={classNames(cls.form, {}, [className])}>
        <Input
          placeholder={'Имя'}
          {...register('name', {
            required: {
              message: 'Заполните имя',
              value: true,
            },
          })}
          aria-invalid={!!errors.name}
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          className={cls.title}
          placeholder={'Заголовок отзыва'}
          {...register('title', {
            required: {
              message: 'Заполните заголовок',
              value: true,
            },
          })}
          aria-invalid={!!errors.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={cls.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name={'rating'}
            render={({ field }) => (
              <StarRating
                error={errors.rating}
                isEditable
                ref={field.ref}
                selectedStars={field.value}
                setRating={field.onChange}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
            rules={{
              required: {
                message: 'Укажите рейтинг',
                value: true,
              },
            }}
          />
        </div>
        <Textarea
          className={cls.description}
          placeholder={'Текст отзыва'}
          {...register('description', {
            required: {
              message: 'Заполните текст отзыва',
              value: true,
            },
          })}
          aria-invalid={!!errors.description}
          aria-label={'Текст отзыва'}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={cls.submit}>
          <Button onClick={() => clearErrors()} tabIndex={isOpened ? 0 : -1} variant={'primary'}>
            Отправить
          </Button>
          <span className={cls.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={classNames(cls.panel, {}, [cls.success])} role={'alert'}>
          <span className={cls['success-title']}>Ваш отзыв отправлен.</span>
          <span>Спасибо, Ваш отзыв будет опубликован после проверки.</span>
          <button
            aria-label={'Закрыть оповещение'}
            className={cls.close}
            onClick={() => setIsSuccess(false)}
            type={'button'}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {error && (
        <div className={classNames(cls.panel, {}, [cls.error])} role={'alert'}>
          {error}
          <button
            aria-label={'Закрыть оповещение'}
            className={cls.close}
            onClick={() => setError(undefined)}
            type={'button'}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
