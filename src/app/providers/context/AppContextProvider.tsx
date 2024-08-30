import { PropsWithChildren, useState } from 'react'

import { MenuItem } from '@/shared/types/menu'

import { AppContext, IAppContext } from './store'

export const AppContextProvider = ({ children, menu }: PropsWithChildren<IAppContext>) => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu)

  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu)
  }

  const value = {
    menu: menuState,
    setMenu,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
