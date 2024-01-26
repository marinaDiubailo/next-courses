import { useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ProductCard, ProductModel } from '@/entities/Product';
import { ReviewList } from '@/entities/Review';
import { ReviewForm } from '@/features/AddNewReview';
import { Card } from '@/shared/ui/Card';
import cls from './TopPageProduct.module.scss';

interface TopPageProductProps {
    className?: string;
    product: ProductModel;
}

export const TopPageProduct = (props: TopPageProductProps): JSX.Element => {
    const { className, product } = props;
    const [isReviewOpened, setIsReviewOpened] = useState(false);
    const [addonDown, setAddonDown] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const reviewsHandler = () => {
        setIsReviewOpened((prev) => !prev);
        setAddonDown((prev) => !prev);
    };

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        reviewRef.current?.focus();
    };

    const mods: Mods = {
        [cls.opened]: isReviewOpened,
        [cls.closed]: !isReviewOpened,
    };

    return (
        <>
            <ProductCard
                product={product}
                onClick={reviewsHandler}
                addonDown={addonDown}
                onRatingTitleClick={scrollToReview}
            />

            <Card
                className={classNames(cls.reviews, mods, [className])}
                color="blue"
                ref={reviewRef}
            >
                <ReviewList reviews={product.reviews} />
                {isReviewOpened && (
                    <ReviewForm
                        productId={product._id}
                        isOpened={isReviewOpened}
                    />
                )}
            </Card>
        </>
    );
};
