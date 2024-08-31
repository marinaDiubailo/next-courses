import type { FC } from 'react'

import { Check } from '@/shared/assets/icons'
import { TopPageAdvantage } from '@/shared/types/page'
import { HTag, Text } from '@/shared/ui'

import s from './TopPageAdvantages.module.scss'

type Props = {
  advantages: TopPageAdvantage[]
}

export const TopPageAdvantages: FC<Props> = ({ advantages }) => {
  return (
    <section className={s.section}>
      <HTag tag={'h2'}>Преимущества</HTag>
      <ul className={s.advantagesList}>
        {advantages.map(advantage => (
          <li className={s.advantage} key={advantage._id}>
            <Check />
            <div className={s.title}>{advantage.title}</div>
            <span className={s.line}></span>
            <Text className={s.description} size={'l'}>
              {advantage.description}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  )
}

TopPageAdvantages.displayName = 'TopPageAdvantages'
