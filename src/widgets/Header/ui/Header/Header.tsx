import React, { useEffect, useState } from 'react'

import { Menu } from '@/entities/Menu'
//import { ProductsSearch } from '@/features/ProductsSearch'
import AppLogo from '@/shared/assets/icons/logo.svg'
import BurgerIcon from '@/shared/assets/icons/menuBurger.svg'
import CloseIcon from '@/shared/assets/icons/menuClose.svg'
import { Button, Icon, ScrollArea } from '@/shared/ui'
import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

export const Header: React.FC<React.ComponentProps<'header'>> = ({ className, ...props }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    setIsOpened(false)
  }, [router])

  const variants = {
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
    },
    opened: {
      opacity: 1,
      transition: {
        stiffness: 20,
      },
      x: 0,
    },
  }

  return (
    <header className={clsx(s.header, className)} {...props}>
      <Link href={'/'}>
        <Icon Svg={AppLogo} />
      </Link>
      <Button
        aria-label={'Открыть основное меню'}
        onClick={() => setIsOpened(true)}
        title={'Открыть основное меню'}
        variant={'icon'}
      >
        <Icon Svg={BurgerIcon} variant={'secondary'} />
      </Button>

      <motion.div
        animate={isOpened ? 'opened' : 'closed'}
        className={s.mobile}
        initial={'closed'}
        variants={variants}
      >
        <div className={s.actions}>
          <Link href={'/'}>
            <Icon Svg={AppLogo} />
          </Link>
          <Button
            aria-label={'Закрыть основное меню'}
            className={s.close}
            onClick={() => setIsOpened(false)}
            title={'Закрыть основное меню'}
            variant={'icon'}
          >
            <Icon Svg={CloseIcon} variant={'secondary'} />
          </Button>
        </div>
        {/* <ProductsSearch /> */}
        <ScrollArea>
          <Menu />
        </ScrollArea>
      </motion.div>
    </header>
  )
}

Header.displayName = 'Header'
