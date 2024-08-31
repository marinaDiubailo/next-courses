import React, { KeyboardEvent, useRef, useState } from 'react'

import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar'
import clsx from 'clsx'

import s from './MainLayout.module.scss'

import { AppContextProvider } from '../../providers/context/AppContextProvider'
import { IAppContext } from '../../providers/context/store'

const MainLayout: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
    }
    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={s.wrapper}>
      <button
        className={clsx(s.skipLink, isSkipLinkDisplayed && s.displayed)}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
        tabIndex={0}
        type={'button'}
      >
        Сразу к содержанию
      </button>
      <Header className={s.header} />
      <div className={s.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={s.content} ref={bodyRef} role={'main'} tabIndex={0}>
        {children}
      </div>
    </div>
  )
}

export const withLayout = <T extends IAppContext & Record<string, unknown>>(
  Component: React.FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): React.JSX.Element {
    return (
      <AppContextProvider menu={props.menu}>
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      </AppContextProvider>
    )
  }
}
