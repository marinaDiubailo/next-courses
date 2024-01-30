import { ForwardedRef, forwardRef, ReactNode, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardColor = 'white' | 'blue';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    color?: CardColor;
    children: ReactNode;
}

export const Card = forwardRef(
    (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
        const { className, color = 'white', children, ...otherProps } = props;

        return (
            <div
                className={classNames(cls.card, {}, [className, cls[color]])}
                ref={ref}
                {...otherProps}
            >
                {children}
            </div>
        );
    },
);
