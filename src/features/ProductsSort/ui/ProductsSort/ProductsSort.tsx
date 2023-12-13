import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import SortIcon from '@/shared/assets/icons/sort.svg';
import { Icon } from '@/shared/ui/Icon';
import { Sort } from '../../model/types/sort';
import cls from './ProductsSort.module.scss';

interface ProductsSortProps {
    className?: string;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

export const ProductsSort = memo((props: ProductsSortProps): JSX.Element => {
    const { className, sort, setSort } = props;

    return (
        <div className={classNames(cls.sort, {}, [className])}>
            <span
                onClick={() => setSort(Sort.Rating)}
                className={classNames('', {
                    [cls.active]: sort === Sort.Rating,
                })}
            >
                <Icon Svg={SortIcon} className={cls.icon} />
                По рейтингу
            </span>
            <span
                onClick={() => setSort(Sort.Price)}
                className={classNames('', {
                    [cls.active]: sort === Sort.Price,
                })}
            >
                <Icon Svg={SortIcon} className={cls.icon} />
                По цене
            </span>
        </div>
    );
});
