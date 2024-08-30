/* eslint-disable jsx-a11y/role-supports-aria-props */
import type { FC } from 'react'

import SortIcon from '@/shared/assets/icons/sort.svg'
import { Icon } from '@/shared/ui'
import clsx from 'clsx'

import s from './ProductsSort.module.scss'

import { Sort } from '../../model/types/sort'

type Props = {
  setSort: (sort: Sort) => void
  sort: Sort
}

export const ProductsSort: FC<Props> = ({ setSort, sort }) => {
  return (
    <ul aria-label={'Сортировка'} className={s.sort}>
      <li aria-selected={sort === Sort.Rating} title={'Сортировка по рейтингу'}>
        <button
          aria-label={'Сортировка по рейтингу'}
          className={clsx(sort === Sort.Rating && s.active)}
          onClick={() => setSort(Sort.Rating)}
          type={'button'}
        >
          <Icon Svg={SortIcon} className={s.icon} />
          По рейтингу
        </button>
      </li>
      <li aria-selected={sort === Sort.Price} title={'Сортировка по цене'}>
        <button
          aria-label={'Сортировка по цене'}
          className={clsx(sort === Sort.Price && s.active)}
          onClick={() => setSort(Sort.Price)}
          type={'button'}
        >
          <Icon Svg={SortIcon} className={s.icon} />
          По цене
        </button>
      </li>
    </ul>
  )
}

ProductsSort.displayName = 'ProductsSort'
