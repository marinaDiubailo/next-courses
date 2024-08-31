import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Close } from '@/shared/assets/icons'
import { API } from '@/shared/consts/api'
import { Button, Input, StarRating, Textarea } from '@/shared/ui'
import axios from 'axios'
import clsx from 'clsx'

import s from './ReviewForm.module.scss'

import { IReviewForm, IReviewSentResponse } from '../../model/types/reviewForm'

type Props = {
  isOpened: boolean
  productId: string
}

export const ReviewForm: FC<Props> = ({ isOpened, productId }) => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState(false)

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
      <div className={s.form}>
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
          className={s.title}
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
        <div className={s.rating}>
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
          className={s.description}
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
        <div className={s.submit}>
          <Button onClick={() => clearErrors()} tabIndex={isOpened ? 0 : -1} variant={'primary'}>
            Отправить
          </Button>
          <span className={s.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={clsx(s.panel, s.success)} role={'alert'}>
          <span className={s.successTitle}>Ваш отзыв отправлен.</span>
          <span>Спасибо, Ваш отзыв будет опубликован после проверки.</span>
          <button
            aria-label={'Закрыть оповещение'}
            className={s.close}
            onClick={() => setIsSuccess(false)}
            type={'button'}
          >
            <Close />
          </button>
        </div>
      )}

      {error && (
        <div className={clsx(s.panel, s.error)} role={'alert'}>
          {error}
          <button
            aria-label={'Закрыть оповещение'}
            className={s.close}
            onClick={() => setError(undefined)}
            type={'button'}
          >
            <Close />
          </button>
        </div>
      )}
    </form>
  )
}
