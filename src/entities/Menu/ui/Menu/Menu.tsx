/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { AppContext } from '@/app/providers/context/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { PageItem } from '@/shared/types/menu'
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu'
import { FirstLevelMenuItem } from '@/shared/types/menu'
import cls from './Menu.module.scss'

interface MenuProps {
  className?: string
}

export const Menu = (props: MenuProps) => {
  const { className } = props

  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined)
  const { menu, firstCategory, setMenu } = useContext(AppContext)
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    visible: {
      //marginBottom: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    // hidden: {
    //   //marginBottom: 0,
    // },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0,
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
                type="button"
                className={cls['second-level']}
                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                aria-expanded={menuItem.isOpened}
              >
                {menuItem._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={cls['second-level-block']}
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
          key={page._id}
          variants={variantsChildren}
          aria-current={currentPath === router.asPath ? 'page' : false}
        >
          <Link
            tabIndex={isOpened ? 0 : -1}
            className={classNames(cls['third-level'], {
              [cls.active]: currentPath === router.asPath,
            })}
            href={currentPath}
          >
            {page.category}
          </Link>
        </motion.li>
      )
    })
  }

  return (
    <nav role="navigation" className={classNames('', {}, [className])}>
      {announce && (
        <span className="visualy-hidden" role="log">
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildSecondLevel(firstLevelMenu[0])}
    </nav>
  )
}
