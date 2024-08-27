/* eslint-disable no-constant-condition */
import type { ComponentProps, FC } from 'react'

import RateIcon from '@/shared/assets/icons/rate.svg'
import { Icon } from '@/shared/ui/Icon'
import clsx from 'clsx'

import s from './SalaryRating.module.scss'

type SalaryRatingProps = {
  level?: '1' | '2' | '3'
} & ComponentProps<'div'>

export const SalaryRating: FC<SalaryRatingProps> = ({ className, level = '1', ...rest }) => {
  return (
    <div className={clsx(s.rate, className)} role={'presentation'} {...rest}>
      <Icon Svg={RateIcon} className={s.filled} />
      <Icon
        Svg={RateIcon}
        className={clsx(level === '2' || level === '3' ? s.filled : undefined)}
      />
      <Icon Svg={RateIcon} className={clsx(level === '3' ? s.filled : undefined)} />
    </div>
  )
}
