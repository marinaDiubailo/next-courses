import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TopPageAdvantage } from '@/shared/types/page';
import { HTag } from '@/shared/ui/HTag';
import { ProductAdvantage } from '@/shared/ui/ProductAdvantage';

interface TopPageAdvantagesProps {
    className?: string;
    advantages: TopPageAdvantage[];
}

export const TopPageAdvantages = memo(
    (props: TopPageAdvantagesProps): JSX.Element => {
        const { className, advantages } = props;

        return (
            <div className={classNames('', {}, [className])}>
                <HTag tag="h2">Преимущества</HTag>
                {advantages.map((advantage) => (
                    <ProductAdvantage
                        key={advantage._id}
                        title={advantage.title}
                        description={advantage.description}
                    />
                ))}
            </div>
        );
    },
);
