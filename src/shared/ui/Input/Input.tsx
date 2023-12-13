import { InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = memo((props: InputProps): JSX.Element => {
    const { className, ...otherProps } = props;

    return (
        <input
            className={classNames(cls.input, {}, [className])}
            {...otherProps}
        />
    );
});
