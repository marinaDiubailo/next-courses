import { memo } from 'react';
import Link from 'next/link';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FirstLevelMenuItem } from '../../model/types/menu';
import cls from './FirstLevelItem.module.scss';

interface FirstLevelItemProps {
    className?: string;
    category: FirstLevelMenuItem;
    isActive: boolean;
}

export const FirstLevelItem = memo(
    (props: FirstLevelItemProps): JSX.Element => {
        const { className, category, isActive } = props;

        return (
            <Link
                href={`/${category.route}`}
                className={classNames('', {}, [className])}
            >
                {
                    <div
                        className={classNames(cls.link, {
                            [cls.active]: isActive,
                        })}
                    >
                        {category.icon}
                        <span>{category.name}</span>
                    </div>
                }
            </Link>
        );
    },
);
