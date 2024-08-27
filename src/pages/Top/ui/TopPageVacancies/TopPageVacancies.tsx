import { classNames } from '@/shared/lib/classNames/classNames'
import { priceRu } from '@/shared/lib/priceRu/priceRu'
import { HhData } from '@/shared/types/page'
import { Card, HTag, Tag } from '@/shared/ui'

import cls from './TopPageVacancies.module.scss'

import { SalaryRating } from '../SalaryRating/SalaryRating'

type HhDataProps = Omit<HhData, '_id' | 'updatedAt'>

interface TopPageVacanciesProps extends HhDataProps {
  category: string
  className?: string
}

export const TopPageVacancies = (props: TopPageVacanciesProps) => {
  const { category, className, count, juniorSalary, middleSalary, seniorSalary } = props

  return (
    <section className={classNames(cls.section, {}, [className])}>
      <div className={classNames(cls['vacancies-title'], {}, [className])}>
        <HTag tag={'h2'}>Вакансии - {category}</HTag>
        <Tag color={'red'} size={'m'}>
          hh.ru
        </Tag>
      </div>
      <div className={cls.vacancies}>
        <Card className={cls['count-wrapper']}>
          <div className={cls.title}>Всего вакансий</div>
          <div className={cls.count}>{count}</div>
        </Card>
        <ul className={cls.salary}>
          <li>
            <div className={cls.title}>Начальный</div>
            <span className={cls['salary-value']}>{priceRu(juniorSalary)}</span>
            <SalaryRating />
          </li>
          <li>
            <div className={cls.title}>Средний</div>
            <span className={cls['salary-value']}>{priceRu(middleSalary)}</span>
            <SalaryRating level={'2'} />
          </li>
          <li>
            <div className={cls.title}>Профессионал</div>
            <span className={cls['salary-value']}>{priceRu(seniorSalary)}</span>
            <SalaryRating level={'3'} />
          </li>
        </ul>
      </div>
    </section>
  )
}

TopPageVacancies.dispalayName = 'TopPageVacancies'
