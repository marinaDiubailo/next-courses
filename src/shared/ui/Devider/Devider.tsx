import { HTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Devider.module.scss';

interface DeviderProps extends HTMLAttributes<HTMLHRElement> {
    className?: string;
}

export const Devider = memo((props: DeviderProps): JSX.Element => {
    const { className, ...otherProps } = props;

    return (
        <hr
            className={classNames(cls.devider, {}, [className])}
            {...otherProps}
        />
    );
});

Devider.displayName = 'Devider';
