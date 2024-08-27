import { useEffect } from 'react'

import UpIcon from '@/shared/assets/icons/up.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useScrollY } from '@/shared/lib/hooks/useScrollY/useScrollY'
import { Icon } from '@/shared/ui/Icon'
import { motion, useAnimation } from 'framer-motion'

import cls from './UpButton.module.scss'

interface UpButtonProps {
  className?: string
}

export const UpButton = (props: UpButtonProps) => {
  const { className } = props
  const controls = useAnimation()

  const y = useScrollY()

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight })
  }, [y, controls])

  const upToTopHandler = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }}>
      <Icon
        Svg={UpIcon}
        className={classNames(cls.up, {}, [className])}
        clickable
        label={'Наверх'}
        onClick={upToTopHandler}
      />
    </motion.div>
  )
}
