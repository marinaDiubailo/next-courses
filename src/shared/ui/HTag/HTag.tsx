import type { FC, ReactNode } from 'react'

import clsx from 'clsx'

import s from './HTag.module.scss'

export type HTagProps = {
  children: ReactNode
  className?: string
  tag: 'h1' | 'h2' | 'h3'
}

export const HTag: FC<HTagProps> = ({ children, className, tag }) => {
  const HeaderTag = tag

  return <HeaderTag className={clsx(s[tag], className)}>{children}</HeaderTag>
}

HTag.displayName = 'HTag'
