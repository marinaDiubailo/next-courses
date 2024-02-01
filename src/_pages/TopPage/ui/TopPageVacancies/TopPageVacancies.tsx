import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HTag } from '@/shared/ui/HTag';
import { Tag } from '@/shared/ui/Tag';
import { Card } from '@/shared/ui/Card';
import { HhData } from '@/shared/types/page';
import { SalaryRating } from '@/shared/ui/SalaryRating';
import cls from './TopPageVacancies.module.scss';
import { priceRu } from '@/shared/lib/priceRu/priceRu';

type HhDataProps = Omit<HhData, '_id' | 'updatedAt'>;

interface TopPageVacanciesProps extends HhDataProps {
    className?: string;
    category: string;
}

export const TopPageVacancies = memo(
    (props: TopPageVacanciesProps): JSX.Element => {
        const {
            className,
            category,
            count,
            juniorSalary,
            middleSalary,
            seniorSalary,
        } = props;

        return (
            <section>
                <div
                    className={classNames(cls['vacancies-title'], {}, [
                        className,
                    ])}
                >
                    <HTag tag="h2">Вакансии - {category}</HTag>
                    <Tag color="red" size="m">
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
                            <div className={cls['salary-value']}>
                                {priceRu(juniorSalary)}
                            </div>
                            <SalaryRating />
                        </li>
                        <li>
                            <div className={cls.title}>Средний</div>
                            <div className={cls['salary-value']}>
                                {priceRu(middleSalary)}
                            </div>
                            <SalaryRating level="2" />
                        </li>
                        <li>
                            <div className={cls.title}>Профессионал</div>
                            <div className={cls['salary-value']}>
                                {priceRu(seniorSalary)}
                            </div>
                            <SalaryRating level="3" />
                        </li>
                    </ul>
                </div>
            </section>
        );
    },
);
