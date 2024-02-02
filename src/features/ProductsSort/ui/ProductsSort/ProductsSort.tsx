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

export const ProductsSort = (props: ProductsSortProps) => {
    const { className, sort, setSort } = props;

    return (
        <ul
            className={classNames(cls.sort, {}, [className])}
            aria-label="Сортировка"
        >
            <li
                aria-selected={sort === Sort.Rating}
                title="Сортировка по рейтингу"
            >
                <button
                    aria-label="Сортировка по рейтингу"
                    onClick={() => setSort(Sort.Rating)}
                    className={classNames('', {
                        [cls.active]: sort === Sort.Rating,
                    })}
                >
                    <Icon Svg={SortIcon} className={cls.icon} />
                    По рейтингу
                </button>
            </li>
            <li aria-selected={sort === Sort.Price} title="Сортировка по цене">
                <button
                    aria-label="Сортировка по цене"
                    onClick={() => setSort(Sort.Price)}
                    className={classNames('', {
                        [cls.active]: sort === Sort.Price,
                    })}
                >
                    <Icon Svg={SortIcon} className={cls.icon} />
                    По цене
                </button>
            </li>
        </ul>
    );
};

ProductsSort.displayName = 'ProductsSort';
