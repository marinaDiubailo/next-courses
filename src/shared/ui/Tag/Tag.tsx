import type { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import s from './Tag.module.scss'

export type TagProps = {
  color?: 'ghost' | 'green' | 'grey' | 'primary' | 'red'
  href?: string
  size?: 'm' | 's'
} & ComponentProps<'div'>

export const Tag: FC<TagProps> = props => {
  const { children, className, color = 'primary', href, size = 's', ...rest } = props

  return (
    <div className={clsx(s.tag, s[size], s[color], className)} {...rest}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  )
}
