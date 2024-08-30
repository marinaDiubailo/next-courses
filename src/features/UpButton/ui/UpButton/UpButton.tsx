import { useEffect } from 'react'

import UpIcon from '@/shared/assets/icons/up.svg'
import { useScrollY } from '@/shared/lib/hooks/useScrollY/useScrollY'
import { Icon } from '@/shared/ui'
import { motion, useAnimation } from 'framer-motion'

import s from './UpButton.module.scss'

export const UpButton = () => {
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
      <Icon Svg={UpIcon} className={s.up} clickable label={'Наверх'} onClick={upToTopHandler} />
    </motion.div>
  )
}
