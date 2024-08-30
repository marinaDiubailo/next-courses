import React, { ComponentProps, useContext, useState } from 'react'

import { AppContext } from '@/app/providers/context/store'
import { PageItem } from '@/shared/types/menu'
import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Menu.module.scss'

export const Menu: React.FC<ComponentProps<'nav'>> = ({ className, ...props }) => {
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined)
  const { menu, setMenu } = useContext(AppContext)
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    visible: {
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.1,
            when: 'beforeChildren',
          },
    },
  }

  const variantsChildren = {
    hidden: {
      height: 0,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
    },
  }

  const openFirstLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map(menuItem => {
          if (menuItem._id.secondCategory === secondCategory) {
            setAnnounce(menuItem.isOpened ? 'closed' : 'opened')
            menuItem.isOpened = !menuItem.isOpened
          }

          return menuItem
        })
      )
  }

  const buildFirstLevel = () => {
    return (
      <ul className={s.firstLevelList}>
        {menu.map(menuItem => {
          if (menuItem.pages.map(page => page.alias).includes(router.asPath.split('/')[1])) {
            menuItem.isOpened = true
          }

          return (
            <li key={menuItem._id.secondCategory}>
              <button
                aria-expanded={menuItem.isOpened}
                className={s.firstlevelItem}
                onClick={() => openFirstLevel(menuItem._id.secondCategory)}
                type={'button'}
              >
                {menuItem._id.secondCategory}
              </button>
              <motion.ul
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={s.firstLevelBlock}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                layout
                variants={variants}
              >
                {buildSecondLevel(menuItem.pages, menuItem.isOpened ?? false)}
              </motion.ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildSecondLevel = (pages: PageItem[], isOpened: boolean) => {
    return pages.map(page => {
      const currentPath = `/${page.alias}`

      return (
        <motion.li
          aria-current={currentPath === router.asPath ? 'page' : false}
          key={page._id}
          variants={variantsChildren}
        >
          <Link
            className={clsx(s.secondLevelItem, currentPath === router.asPath && s.active)}
            href={currentPath}
            tabIndex={isOpened ? 0 : -1}
          >
            {page.category}
          </Link>
        </motion.li>
      )
    })
  }

  return (
    <nav className={clsx(className)} role={'navigation'} {...props}>
      {announce && (
        <span className={'visualy-hidden'} role={'log'}>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  )
}
