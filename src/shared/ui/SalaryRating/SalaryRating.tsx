/* eslint-disable no-constant-condition */
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import RateIcon from '../../assets/icons/rate.svg';
import cls from './SalaryRating.module.scss';
import { Icon } from '../Icon';

type SalaryLevel = '1' | '2' | '3';

interface SalaryRatingProps {
    className?: string;
    level?: SalaryLevel;
}

export const SalaryRating = memo((props: SalaryRatingProps): JSX.Element => {
    const { className, level = '1' } = props;

    return (
        <div className={classNames(cls.rate, {}, [className])}>
            <Icon Svg={RateIcon} className={classNames('', {}, [cls.filled])} />
            <Icon
                Svg={RateIcon}
                className={classNames('', {}, [
                    level === '2' || level === '3' ? cls.filled : undefined,
                ])}
            />
            <Icon
                Svg={RateIcon}
                className={classNames('', {}, [
                    level === '3' ? cls.filled : undefined,
                ])}
            />
        </div>
    );
});
