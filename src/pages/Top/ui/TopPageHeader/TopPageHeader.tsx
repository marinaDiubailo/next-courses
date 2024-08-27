import { ProductsSort, Sort } from '@/features/ProductsSort'
import { classNames } from '@/shared/lib/classNames/classNames'
import { numDeclination } from '@/shared/lib/numDeclination/numDeclination'
import { HTag, Tag } from '@/shared/ui'

import cls from './TopPageHeader.module.scss'

interface TopPageHeaderProps {
  className?: string
  productsLength?: number
  setSort: (sort: Sort) => void
  sort: Sort
  title: string
}

export const TopPageHeader = (props: TopPageHeaderProps) => {
  const { className, productsLength, setSort, sort, title } = props

  return (
    <div className={classNames(cls.header, {}, [className])}>
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
