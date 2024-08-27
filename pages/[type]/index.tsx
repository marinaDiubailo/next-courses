import { ParsedUrlQuery } from 'querystring'

import { withLayout } from '@/app/layouts/MainLayout'
import { API } from '@/shared/consts/api'
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu'
import { MenuItem } from '@/shared/types/menu'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

interface TypeProps extends Record<string, unknown> {
  firstCategory: number
  menu: MenuItem[]
}

function Type() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      Курсы OWL Top
    </div>
  )
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: firstLevelMenu.map(menu => '/' + menu.route),
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  })

  return {
    props: {
      firstCategory: firstCategoryItem.id,
      menu,
    },
  }
}
