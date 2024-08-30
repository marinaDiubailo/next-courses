import type { ComponentProps, FC } from 'react'

import { ProductsSort, Sort } from '@/features/ProductsSort'
import { numDeclination } from '@/shared/lib/numDeclination/numDeclination'
import { HTag, Tag } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './TopPageHeader.module.scss'

type Props = {
  className?: string
  productsLength?: number
  setSort: (sort: Sort) => void
  sort: Sort
  title: string
} & ComponentProps<'div'>

export const TopPageHeader: FC<Props> = props => {
  const { className, productsLength, setSort, sort, title } = props

  return (
    <div className={clsx(s.header, className)}>
      <HTag tag={'h1'}>{title}</HTag>
      {productsLength ? (
        <Tag
          aria-label={numDeclination(productsLength, ['элемент', 'элемента', 'элементов'])}
          color={'grey'}
          size={'m'}
        >
          {productsLength}
        </Tag>
      ) : null}
      {productsLength ? <ProductsSort setSort={setSort} sort={sort} /> : null}
      {!productsLength && <span>Пока нет курсов</span>}
    </div>
  )
}

TopPageHeader.displayName = 'TopPageHeader'
