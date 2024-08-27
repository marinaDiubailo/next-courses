import { useEffect, useReducer } from 'react'

import { Sort } from '@/features/ProductsSort'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TopLevelCategory, TopPageModel } from '@/shared/types/page'
import { ProductModel } from '@/shared/types/product'
import { HTag, ScrollArea, Tag } from '@/shared/ui'
import clsx from 'clsx'
import { useReducedMotion } from 'framer-motion'

import cls from './TopPageComponent.module.scss'

import { sortReducer } from '../../model/services/sortReducer'
import { TopPageAdvantages } from '../TopPageAdvantages/TopPageAdvantages'
import { TopPageHeader } from '../TopPageHeader/TopPageHeader'
import { TopPageProduct } from '../TopPageProduct/TopPageProduct'
import { TopPageVacancies } from '../TopPageVacancies/TopPageVacancies'

interface TopPageComponentProps {
  className?: string
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}

export const TopPageComponent = (props: TopPageComponentProps) => {
  const { className, firstCategory, page, products } = props
  const isCourses = firstCategory === TopLevelCategory.Courses
  const shouldReduceMotion = useReducedMotion()

  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: Sort.Rating,
  })

  const onSetSort = (sort: Sort) => {
    dispatchSort({ type: sort })
  }

  useEffect(() => {
    dispatchSort({ initialState: products, type: 'reset' })
  }, [products])

  return (
    <div className={clsx(cls.root, className)}>
      <TopPageHeader
        className={cls.header}
        productsLength={products?.length}
        setSort={onSetSort}
        sort={sort}
        title={page.title}
      />

      <ScrollArea>
        <ul className={cls.productList}>
          {sortedProducts &&
            sortedProducts.map(product => (
              <TopPageProduct
                key={product._id}
                layout={shouldReduceMotion ? false : true}
                product={product}
              />
            ))}
        </ul>
        {isCourses && page.hh ? (
          <TopPageVacancies
            category={page.category}
            count={page.hh.count}
            juniorSalary={page.hh.juniorSalary}
            middleSalary={page.hh.middleSalary}
            seniorSalary={page.hh.seniorSalary}
          />
        ) : null}
        {page.advantages && page.advantages.length ? (
          <TopPageAdvantages advantages={page.advantages} />
        ) : null}
        {page.seoText && (
          <div className={cls.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
        )}
        <HTag tag={'h2'}>Получаемые навыки</HTag>
        {page.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ScrollArea>
    </div>
  )
}

TopPageComponent.displayName = 'TopPageComponent'
