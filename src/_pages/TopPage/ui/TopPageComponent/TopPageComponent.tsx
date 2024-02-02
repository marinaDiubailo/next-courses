import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Sort } from '@/features/ProductsSort';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TopLevelCategory, TopPageModel } from '@/shared/types/page';
import { ProductModel } from '@/shared/types/product';
import { HTag } from '@/shared/ui/HTag';
import { Tag } from '@/shared/ui/Tag';
import { sortReducer } from '../../model/services/sortReducer';
import { TopPageHeader } from '../TopPageHeader/TopPageHeader';
import { TopPageProduct } from '../TopPageProduct/TopPageProduct';
import { TopPageAdvantages } from '../TopPageAdvantages/TopPageAdvantages';
import { TopPageVacancies } from '../TopPageVacancies/TopPageVacancies';
import cls from './TopPageComponent.module.scss';

interface TopPageComponentProps {
    className?: string;
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}

export const TopPageComponent = (props: TopPageComponentProps) => {
    const { className, page, firstCategory, products } = props;
    const isCourses = firstCategory === TopLevelCategory.Courses;
    const shouldReduceMotion = useReducedMotion();

    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { sort: Sort.Rating, products },
    );

    const onSetSort = (sort: Sort) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={classNames('', {}, [className])}>
            <TopPageHeader
                productsLength={products?.length}
                title={page.title}
                sort={sort}
                setSort={onSetSort}
            />
            <ul>
                {sortedProducts &&
                    sortedProducts.map((product) => (
                        <TopPageProduct
                            layout={shouldReduceMotion ? false : true}
                            key={product._id}
                            product={product}
                        />
                    ))}
            </ul>
            {isCourses && page.hh ? (
                <TopPageVacancies
                    count={page.hh.count}
                    category={page.category}
                    juniorSalary={page.hh.juniorSalary}
                    middleSalary={page.hh.middleSalary}
                    seniorSalary={page.hh.seniorSalary}
                />
            ) : null}
            {page.advantages && page.advantages.length ? (
                <TopPageAdvantages advantages={page.advantages} />
            ) : null}
            {page.seoText && (
                <div
                    className={cls.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            )}
            <HTag tag="h2">Получаемые навыки</HTag>
            {page.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
            ))}
        </div>
    );
};

TopPageComponent.displayName = 'TopPageComponent';
