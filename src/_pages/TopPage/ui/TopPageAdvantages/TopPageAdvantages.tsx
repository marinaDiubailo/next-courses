import { classNames } from '@/shared/lib/classNames/classNames';
import { TopPageAdvantage } from '@/shared/types/page';
import { HTag } from '@/shared/ui/HTag';
import { ProductAdvantage } from '@/shared/ui/ProductAdvantage';
import cls from './TopPageAdvantages.module.scss';

interface TopPageAdvantagesProps {
    className?: string;
    advantages: TopPageAdvantage[];
}

export const TopPageAdvantages = (props: TopPageAdvantagesProps) => {
    const { className, advantages } = props;

    return (
        <section className={classNames('', {}, [className])}>
            <HTag tag="h2">Преимущества</HTag>
            <ul className={cls['advantages-list']}>
                {advantages.map((advantage) => (
                    <ProductAdvantage
                        key={advantage._id}
                        title={advantage.title}
                        description={advantage.description}
                    />
                ))}
            </ul>
        </section>
    );
};

TopPageAdvantages.displayName = 'TopPageAdvantages';
