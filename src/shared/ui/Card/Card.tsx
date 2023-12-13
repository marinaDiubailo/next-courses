import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardColor = 'white' | 'blue';

interface CardProps {
    className?: string;
    color?: CardColor;
    children: ReactNode;
}

export const Card = memo((props: CardProps): JSX.Element => {
    const { className, color = 'white', children, ...otherProps } = props;

    return (
        <div
            className={classNames(cls.card, {}, [className, cls[color]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
