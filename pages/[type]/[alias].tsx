import { ParsedUrlQuery } from 'querystring'

import { withLayout } from '@/app/layouts/MainLayout'
import { TopPage } from '@/pages/Top'
import { API } from '@/shared/consts/api'
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu'
import { MenuItem } from '@/shared/types/menu'
import { TopLevelCategory, TopPageModel } from '@/shared/types/page'
import { ProductModel } from '@/shared/types/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'

import { Error404 } from '../404'

interface PageProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory
  menu: MenuItem[]
  page: TopPageModel
  products: ProductModel[]
}

function Page(props: PageProps) {
  const { firstCategory, page, products } = props

  if (!page || !products) {
    return <Error404 />
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta content={page.metaDescription} name={'description'} />
        <meta content={page.metaTitle} property={'og:title'} />
        <meta content={page.metaDescription} property={'og:description'} />
        <meta content={'article'} property={'og:type'} />
      </Head>
      <TopPage firstCategory={firstCategory} page={page} products={products} />
    </>
  )
}

export default withLayout(Page)

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: menuItem.id,
    })

    paths = paths.concat(
      menu.flatMap(item => item.pages.map(page => `/${menuItem.route}/${page.alias}`))
    )
  }

  return {
    fallback: true,
    paths,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  // { type } = params || {} // 2й вариант
  if (!params) {
    return {
      notFound: true,
    }
  }
  const firstCategoryItem = firstLevelMenu.find(category => category.route === params.type)

  if (!firstCategoryItem) {
    return {
      notFound: true,
    }
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    })

    if (menu.length === 0) {
      return {
        notFound: true,
      }
    }

    const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias)

    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 20,
    })

    return {
      props: {
        firstCategory: firstCategoryItem.id,
        menu,
        page,
        products,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
