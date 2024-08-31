/* eslint-disable no-constant-condition */
import type { ComponentProps, FC } from 'react'

import { Rate } from '@/shared/assets/icons'
import clsx from 'clsx'

import s from './SalaryRating.module.scss'

type SalaryRatingProps = {
  level?: '1' | '2' | '3'
} & ComponentProps<'div'>

export const SalaryRating: FC<SalaryRatingProps> = ({ className, level = '1', ...rest }) => {
  return (
    <div className={clsx(s.rate, className)} role={'presentation'} {...rest}>
      <Rate className={s.filled} />
      <Rate className={clsx(level === '2' || level === '3' ? s.filled : undefined)} />
      <Rate className={clsx(level === '3' ? s.filled : undefined)} />
    </div>
  )
}
