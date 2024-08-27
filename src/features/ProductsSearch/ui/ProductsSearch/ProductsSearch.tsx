import { KeyboardEvent, useState } from 'react'

import SearchIcon from '@/shared/assets/icons/search.svg'
import { Button, Input } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './ProductsSearch.module.scss'

interface ProductsSearchProps {
  className?: string
}

export const ProductsSearch = (props: ProductsSearchProps) => {
  const { className, ...rest } = props
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
    <form className={clsx(s.search, className)} role={'search'} {...rest}>
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
