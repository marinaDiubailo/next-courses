import { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import s from './ErrorMessage.module.scss'

export const ErrorMessage: FC<ComponentProps<'span'>> = ({ children, className, ...rest }) => {
  return (
    <span className={clsx(s.errorMessage, className)} role={'alert'} {...rest}>
      {children}
    </span>
  )
}
