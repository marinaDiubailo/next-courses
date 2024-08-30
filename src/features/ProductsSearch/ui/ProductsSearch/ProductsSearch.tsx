import { KeyboardEvent, useState } from 'react'

import SearchIcon from '@/shared/assets/icons/search.svg'
import { Button, Icon, Input } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './ProductsSearch.module.scss'

export const ProductsSearch = () => {
  const router = useRouter()

  const [search, setSearch] = useState<string>('')

  const navigateToSearchPage = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    })
  }

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigateToSearchPage()
    }
  }

  return (
    <form className={s.search} role={'search'}>
      <Input
        onChange={event => setSearch(event.target.value)}
        onKeyDown={keyDownHandler}
        placeholder={'Поиск...'}
        value={search}
      />
      <Button
        aria-label={'Искать по сайту'}
        className={s.button}
        onClick={navigateToSearchPage}
        small
      >
        <Icon Svg={SearchIcon} />
      </Button>
    </form>
  )
}

ProductsSearch.displayName = 'ProductSearch'
