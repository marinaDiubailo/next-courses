import type { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import s from './Text.module.scss'

export type TextProps = {
  size?: 'l' | 'm' | 's'
} & ComponentProps<'p'>

export const Text: FC<TextProps> = props => {
  const { children, className, size = 'm', ...rest } = props

  return (
    <p className={clsx(s[size], className)} {...rest}>
      {children}
    </p>
  )
}
