import { ForwardedRef, forwardRef, ReactNode, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardColor = 'primary' | 'secondary';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: CardColor;
  children: ReactNode;
}

export const Card = forwardRef(
  (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, color = 'primary', children, ...otherProps } = props;

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

Card.displayName = 'Card';
