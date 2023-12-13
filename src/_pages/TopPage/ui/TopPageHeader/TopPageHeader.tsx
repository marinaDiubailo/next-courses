import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tag } from '@/shared/ui/Tag';
import { HTag } from '@/shared/ui/HTag';
import cls from './TopPageHeader.module.scss';
import { ProductsSort, Sort } from '@/features/ProductsSort';

interface TopPageHeaderProps {
    className?: string;
    title: string;
    productsLength?: number;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

export const TopPageHeader = memo((props: TopPageHeaderProps): JSX.Element => {
    const { className, title, productsLength, sort, setSort } = props;

    return (
        <div className={classNames(cls.header, {}, [className])}>
            <HTag tag="h1">{title}</HTag>
            {productsLength ? (
                <Tag color="grey" size="m">
                    {productsLength}
                </Tag>
            ) : null}

            <ProductsSort sort={sort} setSort={setSort} />
        </div>
    );
});
