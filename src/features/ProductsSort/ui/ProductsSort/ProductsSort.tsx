/* eslint-disable jsx-a11y/role-supports-aria-props */
import SortIcon from '@/shared/assets/icons/sort.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'

import cls from './ProductsSort.module.scss'

import { Sort } from '../../model/types/sort'

interface ProductsSortProps {
  className?: string
  setSort: (sort: Sort) => void
  sort: Sort
}

export const ProductsSort = (props: ProductsSortProps) => {
  const { className, setSort, sort } = props

  return (
    <ul aria-label={'Сортировка'} className={classNames(cls.sort, {}, [className])}>
      <li aria-selected={sort === Sort.Rating} title={'Сортировка по рейтингу'}>
        <button
          aria-label={'Сортировка по рейтингу'}
          className={classNames('', {
            [cls.active]: sort === Sort.Rating,
          })}
          onClick={() => setSort(Sort.Rating)}
          type={'button'}
        >
          <Icon Svg={SortIcon} className={cls.icon} />
          По рейтингу
        </button>
      </li>
      <li aria-selected={sort === Sort.Price} title={'Сортировка по цене'}>
        <button
          aria-label={'Сортировка по цене'}
          className={classNames('', {
            [cls.active]: sort === Sort.Price,
          })}
          onClick={() => setSort(Sort.Price)}
          type={'button'}
        >
          <Icon Svg={SortIcon} className={cls.icon} />
          По цене
        </button>
      </li>
    </ul>
  )
}

ProductsSort.displayName = 'ProductsSort'
