import type { ComponentProps, FC } from 'react'

import clsx from 'clsx'
import { format } from 'date-fns'
import Link from 'next/link'

import s from './Footer.module.scss'

export const Footer: FC<ComponentProps<'footer'>> = ({ className, ...rest }) => {
  return (
    <footer className={clsx(s.footer, className)}>
      <div className={s.rights}>
        Next Courses © 2023 - {format(new Date(), 'yyyy')} <small>Все права защищены</small>
      </div>
      <Link href={'/a'}>Пользовательское соглашение</Link>
      <Link href={'/n'}>Политика конфиденциальности</Link>
    </footer>
  )
}
