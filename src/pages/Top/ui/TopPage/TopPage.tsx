import React, { useEffect, useReducer } from 'react'

import { Sort } from '@/features/ProductsSort'
import { TopPageModel } from '@/shared/types/page'
import { ProductModel } from '@/shared/types/product'
import { HTag, ScrollArea, Tag } from '@/shared/ui'
import { useReducedMotion } from 'framer-motion'

import s from './TopPage.module.scss'

import { sortReducer } from '../../model/services/sortReducer'
import { TopPageAdvantages } from '../TopPageAdvantages/TopPageAdvantages'
import { TopPageHeader } from '../TopPageHeader/TopPageHeader'
import { TopPageProduct } from '../TopPageProduct/TopPageProduct'
import { TopPageVacancies } from '../TopPageVacancies/TopPageVacancies'

type Props = {
  page: TopPageModel
  products: ProductModel[]
}

export const TopPage: React.FC<Props> = props => {
  const { page, products } = props

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
    <main className={s.root}>
      <TopPageHeader
        className={s.header}
        productsLength={products?.length}
        setSort={onSetSort}
        sort={sort}
        title={page.title}
      />

      <ScrollArea>
        <ul className={s.productList}>
          {sortedProducts &&
            sortedProducts.map(product => (
              <TopPageProduct
                key={product._id}
                layout={shouldReduceMotion ? false : true}
                product={product}
              />
            ))}
        </ul>
        {page.hh ? (
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
          <section className={s.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
        )}
        <HTag tag={'h2'}>Получаемые навыки</HTag>
        {page.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ScrollArea>
    </main>
  )
}

TopPage.displayName = 'TopPage'
