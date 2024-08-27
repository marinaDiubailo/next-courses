import { FunctionComponent, JSX, KeyboardEvent, ReactNode, useRef, useState } from 'react'

import { UpButton } from '@/features/UpButton'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar'

import cls from './MainLayout.module.scss'

import { AppContextProvider } from '../../providers/context/AppContextProvider'
import { IAppContext } from '../../providers/context/store'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props

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
    <div className={cls.wrapper}>
      <button
        className={classNames(cls['skip-link'], {
          [cls.displayed]: isSkipLinkDisplayed,
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
        tabIndex={0}
        type={'button'}
      >
        Сразу к содержанию
      </button>
      <Header className={cls.header} />
      <div className={cls.sidebar}>
        <Sidebar />
      </div>

      <div className={cls.content} ref={bodyRef} role={'main'} tabIndex={0}>
        {children}
      </div>
      {/* <Footer className={cls.footer} /> */}
      {/* <UpButton /> */}
    </div>
  )
}

export const withLayout = <T extends IAppContext & Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider firstCategory={props.firstCategory} menu={props.menu}>
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      </AppContextProvider>
    )
  }
}
