import CheckIcon from '@/shared/assets/icons/elipse.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TopPageAdvantage } from '@/shared/types/page'
import { HTag, Text } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'

import cls from './TopPageAdvantages.module.scss'

interface TopPageAdvantagesProps {
  advantages: TopPageAdvantage[]
  className?: string
}

export const TopPageAdvantages = (props: TopPageAdvantagesProps) => {
  const { advantages, className } = props

  return (
    <section className={classNames(cls.section, {}, [className])}>
      <HTag tag={'h2'}>Преимущества</HTag>
      <ul className={cls['advantages-list']}>
        {advantages.map(advantage => (
          <li className={classNames(cls.advantage, {}, [className])} key={advantage._id}>
            <Icon Svg={CheckIcon} />
            <div className={cls.title}>{advantage.title}</div>
            <span className={cls.line}></span>
            <Text className={cls.description} size={'l'}>
              {advantage.description}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  )
}

TopPageAdvantages.displayName = 'TopPageAdvantages'
