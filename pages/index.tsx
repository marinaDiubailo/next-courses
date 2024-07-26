import { GetStaticProps } from 'next'
import axios from 'axios'
import { withLayout } from '@/app/layouts/MainLayout'
import { MenuItem } from '@/shared/types/menu'
import { API } from '@/shared/api/api'

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      Подборка лучших курсов и рейтинги, основанные на реальных отзывах.
    </div>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })
  console.log(menu)
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}
