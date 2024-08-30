import { withLayout } from '@/app/layouts/MainLayout'
import { HomePage } from '@/pages/Home'
import { API } from '@/shared/consts/api'
import { MenuItem } from '@/shared/types/menu'
import axios from 'axios'
import { GetStaticProps } from 'next'

interface HomeProps extends Record<string, unknown> {
  firstCategory: number
  menu: MenuItem[]
}

function Page() {
  return <HomePage />
}

export default withLayout(Page)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })

  return {
    props: {
      firstCategory,
      menu,
    },
  }
}
