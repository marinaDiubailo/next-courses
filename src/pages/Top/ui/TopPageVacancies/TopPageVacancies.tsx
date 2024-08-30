import { FC } from 'react'

import { priceRu } from '@/shared/lib/priceRu/priceRu'
import { HhData } from '@/shared/types/page'
import { Card, HTag, Tag } from '@/shared/ui'

import s from './TopPageVacancies.module.scss'

import { SalaryRating } from '../SalaryRating/SalaryRating'

type HhDataProps = Omit<HhData, '_id' | 'updatedAt'>

type Props = {
  category: string
} & HhDataProps

export const TopPageVacancies: FC<Props> = props => {
  const { category, count, juniorSalary, middleSalary, seniorSalary } = props

  return (
    <section className={s.section}>
      <div className={s.vacanciesTitle}>
        <HTag tag={'h2'}>Вакансии - {category}</HTag>
        <Tag color={'red'} size={'m'}>
          hh.ru
        </Tag>
      </div>
      <div className={s.vacancies}>
        <Card className={s.countWrapper}>
          <div className={s.title}>Всего вакансий</div>
          <div className={s.count}>{count}</div>
        </Card>
        <ul className={s.salary}>
          <li>
            <div className={s.title}>Начальный</div>
            <span className={s.salaryValue}>{priceRu(juniorSalary)}</span>
            <SalaryRating />
          </li>
          <li>
            <div className={s.title}>Средний</div>
            <span className={s.salaryValue}>{priceRu(middleSalary)}</span>
            <SalaryRating level={'2'} />
          </li>
          <li>
            <div className={s.title}>Профессионал</div>
            <span className={s.salaryValue}>{priceRu(seniorSalary)}</span>
            <SalaryRating level={'3'} />
          </li>
        </ul>
      </div>
    </section>
  )
}

TopPageVacancies.displayName = 'TopPageVacancies'
