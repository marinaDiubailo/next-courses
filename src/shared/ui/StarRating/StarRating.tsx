import {
  ComponentPropsWithoutRef,
  ElementRef,
  JSX,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

import clsx from 'clsx'

import s from './StarRating.module.scss'

import StarIcon from '../../assets/icons/rating.svg'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { Icon } from '../Icon/Icon'

export type StarRatingProps = {
  error?: FieldError
  isEditable?: boolean
  selectedStars: number
  setRating?: (selectedStars: number) => void
} & ComponentPropsWithoutRef<'div'>

export const StarRating = forwardRef<ElementRef<'div'>, StarRatingProps>((props, ref) => {
  const {
    className,
    error,
    isEditable = false,
    selectedStars,
    setRating,
    tabIndex,
    ...rest
  } = props

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

  const computeFocus = (rating: number, index: number): number => {
    if (!isEditable) {
      return -1
    }
    if (!selectedStars && index === 0) {
      return tabIndex ?? 0
    }
    if (rating === index + 1) {
      return tabIndex ?? 0
    }

    return -1
  }

  const changeDispay = (starsCount: number) => {
    if (!isEditable) {
      return
    }
    constructRating(starsCount)
  }

  const onClick = (starsCount: number) => {
    if (!isEditable || !setRating) {
      return
    }
    setRating?.(starsCount)
  }

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      if (!selectedStars) {
        setRating(1)
      } else {
        e.preventDefault()
        setRating(selectedStars < 5 ? selectedStars + 1 : 5)
      }
      ratingArrayRef.current[selectedStars]?.focus()
    }
    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault()
      setRating(selectedStars > 1 ? selectedStars - 1 : 1)
      ratingArrayRef.current[selectedStars - 2]?.focus()
    }
  }

  const constructRating = (starsCount: number) => {
    const updatedArray = ratingArray.map((_, index: number) => {
      const starClassName = clsx(s.star, isEditable && s.editable, index < starsCount && s.filled)

      return (
        <span
          aria-invalid={!!error}
          aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + selectedStars}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-valuenow={selectedStars}
          className={starClassName}
          key={index}
          onClick={() => onClick(index + 1)}
          onKeyDown={handleKey}
          onMouseEnter={() => changeDispay(index + 1)}
          onMouseLeave={() => changeDispay(selectedStars)}
          ref={r => ratingArrayRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          tabIndex={computeFocus(selectedStars, index)}
        >
          <Icon Svg={StarIcon} height={'28px'} width={'28px'} />
        </span>
      )
    })

    setRatingArray(updatedArray)
  }

  useEffect(() => {
    constructRating(selectedStars)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStars, tabIndex])

  return (
    <div className={clsx(s.starRating, error?.message && s.error, className)} ref={ref} {...rest}>
      {ratingArray.map((rating, index) => (
        <span key={index}>{rating}</span>
      ))}

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
})

StarRating.displayName = 'StarRating'
