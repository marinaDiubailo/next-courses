import type { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import s from './Devider.module.scss'

export const Devider: FC<ComponentProps<'hr'>> = ({ className, ...rest }) => {
  return <hr className={clsx(s.devider, className)} {...rest} />
}
