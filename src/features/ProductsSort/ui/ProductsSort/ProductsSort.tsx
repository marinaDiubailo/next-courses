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
            <div id="sort" className={cls['sort-name']}>
                Сортировка
            </div>
            <button
                id="rating"
                title="Сортировка по рейтингу"
                onClick={() => setSort(Sort.Rating)}
                className={classNames('', {
                    [cls.active]: sort === Sort.Rating,
                })}
                aria-selected={sort === Sort.Rating}
                aria-labelledby="sort rating"
            >
                <Icon Svg={SortIcon} className={cls.icon} />
                По рейтингу
            </button>
            <button
                id="price"
                title="Сортировка по цене"
                onClick={() => setSort(Sort.Price)}
                className={classNames('', {
                    [cls.active]: sort === Sort.Price,
                })}
                aria-selected={sort === Sort.Price}
                aria-labelledby="sort price"
            >
                <Icon Svg={SortIcon} className={cls.icon} />
                По цене
            </button>
        </div>
    );
});
