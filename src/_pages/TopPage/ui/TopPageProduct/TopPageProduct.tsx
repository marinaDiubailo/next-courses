import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

export const TopPageProduct = motion(
    forwardRef(
        (props: TopPageProductProps, ref: ForwardedRef<HTMLDivElement>) => {
            const { className, product } = props;
            const [isReviewOpened, setIsReviewOpened] = useState(false);
            const [addonDown, setAddonDown] = useState(false);
            const reviewRef = useRef<HTMLDivElement>(null);

            const reviewsHandler = () => {
                setIsReviewOpened((prev) => !prev);
                setAddonDown((prev) => !prev);
            };

            const variants = {
                visible: { opacity: 1, height: 'auto' },
                hidden: { opacity: 0, height: 0 },
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
                <div ref={ref} className={classNames('', {}, [className])}>
                    <ProductCard
                        product={product}
                        onClick={reviewsHandler}
                        addonDown={addonDown}
                        onRatingTitleClick={scrollToReview}
                    />
                    <motion.div
                        variants={variants}
                        animate={isReviewOpened ? 'visible' : 'hidden'}
                        initial="hidden"
                    >
                        <Card
                            className={classNames(cls.reviews, mods)}
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
                    </motion.div>
                </div>
            );
        },
    ),
);
