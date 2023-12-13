import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SecondLevelItem.module.scss';

interface SecondLevelItemProps {
    className?: string;
    secondCategory: string;
}

export const SecondLevelItem = memo(
    (props: SecondLevelItemProps): JSX.Element => {
        const { className, secondCategory } = props;

        return (
            <div className={classNames(cls.menu, {}, [className])}>
                {secondCategory}
            </div>
        );
    },
);
