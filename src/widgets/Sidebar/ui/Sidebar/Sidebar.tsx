import { Menu } from '@/entities/Menu'
import { ProductsSearch } from '@/features/ProductsSearch'
import AppLogo from '@/shared/assets/icons/logo.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Devider, ScrollArea } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'
import { format } from 'date-fns'
import Link from 'next/link'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = (props: SidebarProps) => {
  const { className } = props

  return (
    <aside className={classNames(cls.sidebar, {}, [className])}>
      <Link href={'/'}>
        <Icon Svg={AppLogo} />
      </Link>
      <ProductsSearch />
      <ScrollArea className={cls.menuWrapper}>
        <Menu />
      </ScrollArea>
      <div className={cls.rights}>
        <Devider className={cls.devider} />
        <span>Next Courses © 2023 - {format(new Date(), 'yyyy')}</span>
        <small>Все права защищены</small>
      </div>
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'
