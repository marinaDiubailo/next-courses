import { TopLevelCategory } from './page'

export interface PageItem {
  _id: string
  alias: string
  category: string
  title: string
}

export interface MenuItem {
  _id: {
    secondCategory: string
  }
  isOpened?: boolean
  pages: PageItem[]
}

export interface FirstLevelMenuItem {
  // icon: JSX.Element
  id: TopLevelCategory
  name: string
  route: string
}
