import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Card.module.scss'

export type CardProps = {
  color?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<ElementRef<'div'>, CardProps>((props, ref) => {
  const { children, className, color = 'primary', ...rest } = props

  return (
    <div className={clsx(s.card, s[color], className)} ref={ref} {...rest}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'
