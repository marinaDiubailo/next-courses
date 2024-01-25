import { InputHTMLAttributes, forwardRef, ForwardedRef } from 'react';
import { FieldError } from 'react-hook-form';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { ErrorMessage } from '../ErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: FieldError;
}

export const Input = forwardRef(
    (props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
        const { className, error, ...otherProps } = props;

        return (
            <div className={classNames(cls['input-wrapper'], {}, [className])}>
                <input
                    ref={ref}
                    className={classNames(cls.input, {
                        [cls.error]: error?.message,
                    })}
                    {...otherProps}
                />
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
        );
    },
);
