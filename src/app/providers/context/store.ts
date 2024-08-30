import { createContext } from 'react'

import { MenuItem } from '@/shared/types/menu'

export interface IAppContext {
  menu: MenuItem[]
  setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({
  menu: [],
})
