import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ProductsSearch } from '@/features/ProductsSearch'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppLogo from '@/shared/assets/icons/logo.svg'
import BurgerIcon from '@/shared/assets/icons/menuBurger.svg'
import CloseIcon from '@/shared/assets/icons/menuClose.svg'
import { Icon } from '@/shared/ui/Icon'
import { Menu } from '@/entities/Menu'
import { Button } from '@/shared/ui/Button'
import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const { className } = props
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    setIsOpened(false)
  }, [router])

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
    },
  }

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <Link href="/">
        <Icon Svg={AppLogo} />
      </Link>
      <Button
        variant="icon"
        onClick={() => setIsOpened(true)}
        title="Открыть основное меню"
        aria-label="Открыть основное меню"
      >
        <Icon Svg={BurgerIcon} variant="secondary" />
      </Button>

      <motion.div
        className={cls.mobile}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Link href="/">
          <Icon Svg={AppLogo} />
        </Link>
        <Button
          className={cls.close}
          variant="icon"
          onClick={() => setIsOpened(false)}
          aria-label="Закрыть основное меню"
          title="Закрыть основное меню"
        >
          <Icon Svg={CloseIcon} variant="secondary" />
        </Button>

        <ProductsSearch className={cls.search} />
        <Menu className={cls.menu} />
      </motion.div>
    </header>
  )
}

Header.displayName = 'Header'
