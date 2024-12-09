import { useContext } from 'react'

import { AppContext } from '@/app/providers/context/store'
import { numDeclination } from '@/shared/lib/util'

import s from './MenuGrid.module.scss'

export const MenuGrid = () => {
  const { menu } = useContext(AppContext)

  return (
    <ul className={s.root}>
      {menu.map(menuItem => (
        <li key={menuItem._id.secondCategory}>
          <div className={s.menuItem}>
            <span className={s.title}>{menuItem._id.secondCategory}</span>
            <span className={s.description}>
              {menuItem.pages.length}{' '}
              {numDeclination(menuItem.pages.length, ['подборка', 'подборки', 'подборок'])}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
