import { Menu } from '@/entities/Menu'
//import { ProductsSearch } from '@/features/ProductsSearch'
import { Logo } from '@/shared/assets/icons'
import { Devider, ScrollArea } from '@/shared/ui'
import { format } from 'date-fns'
import Link from 'next/link'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <Link href={'/'}>
        <Logo />
      </Link>
      {/* <ProductsSearch /> */}
      <ScrollArea className={s.menuWrapper}>
        <Menu />
      </ScrollArea>
      <div className={s.rights}>
        <Devider className={s.devider} />
        <span>Next Courses © 2023 - {format(new Date(), 'yyyy')}</span>
        <small>Все права защищены</small>
      </div>
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'
