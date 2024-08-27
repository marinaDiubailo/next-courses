import { useContext, useState } from 'react'

import { AppContext } from '@/app/providers/context/store'
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu'
import { classNames } from '@/shared/lib/classNames/classNames'
import { FirstLevelMenuItem, PageItem } from '@/shared/types/menu'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import cls from './Menu.module.scss'

interface MenuProps {
  className?: string
}

export const Menu = (props: MenuProps) => {
  const { className } = props

  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined)
  const { firstCategory, menu, setMenu } = useContext(AppContext)
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    visible: {
      //marginBottom: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.1,
            when: 'beforeChildren',
          },
    },
    // hidden: {
    //   //marginBottom: 0,
    // },
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

  const openSecondLevel = (secondCategory: string) => {
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

  // const buildFirstLevel = () => {
  //   return (
  //     <ul className={cls['first-level-list']}>
  //       {firstLevelMenu.map(category => {
  //         const isActive = category.id === firstCategory
  //         return (
  //           <li key={category.id} aria-expanded={isActive}>
  //             <Link href={`/${category.route}`}>
  //               {
  //                 <div
  //                   className={classNames(cls['first-level'], {
  //                     [cls.active]: isActive,
  //                   })}
  //                 >
  //                   {category.icon}
  //                   <span>{category.name}</span>
  //                 </div>
  //               }
  //             </Link>
  //             {isActive && buildSecondLevel(category)}
  //           </li>
  //         )
  //       })}
  //     </ul>
  //   )
  // }

  const buildSecondLevel = (category: FirstLevelMenuItem) => {
    return (
      <ul className={cls['second-level-list']}>
        {menu.map(menuItem => {
          if (menuItem.pages.map(page => page.alias).includes(router.asPath.split('/')[2])) {
            menuItem.isOpened = true
          }

          return (
            <li key={menuItem._id.secondCategory}>
              <button
                aria-expanded={menuItem.isOpened}
                className={cls['second-level']}
                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                type={'button'}
              >
                {menuItem._id.secondCategory}
              </button>
              <motion.ul
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={cls['second-level-block']}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                layout
                variants={variants}
              >
                {buildThirdLevel(menuItem.pages, category.route, menuItem.isOpened ?? false)}
              </motion.ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(page => {
      const currentPath = `/${route}/${page.alias}`

      return (
        <motion.li
          aria-current={currentPath === router.asPath ? 'page' : false}
          key={page._id}
          variants={variantsChildren}
        >
          <Link
            className={classNames(cls['third-level'], {
              [cls.active]: currentPath === router.asPath,
            })}
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
    <nav className={classNames('', {}, [className])} role={'navigation'}>
      {announce && (
        <span className={'visualy-hidden'} role={'log'}>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildSecondLevel(firstLevelMenu[0])}
    </nav>
  )
}
