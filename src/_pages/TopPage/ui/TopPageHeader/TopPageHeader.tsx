import { ProductsSort, Sort } from '@/features/ProductsSort';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tag } from '@/shared/ui/Tag';
import { HTag } from '@/shared/ui/HTag';
import { numDeclination } from '@/shared/lib/numDeclination/numDeclination';
import cls from './TopPageHeader.module.scss';

interface TopPageHeaderProps {
    className?: string;
    title: string;
    productsLength?: number;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

export const TopPageHeader = (props: TopPageHeaderProps): JSX.Element => {
    const { className, title, productsLength, sort, setSort } = props;

    return (
        <div className={classNames(cls.header, {}, [className])}>
            <HTag tag="h1">{title}</HTag>
            {productsLength ? (
                <Tag
                    color="grey"
                    size="m"
                    aria-label={numDeclination(productsLength, [
                        'элемент',
                        'элемента',
                        'элементов',
                    ])}
                >
                    {productsLength}
                </Tag>
            ) : null}
            <ProductsSort sort={sort} setSort={setSort} />
        </div>
    );
};

TopPageHeader.displayName = 'TopPageHeader';
