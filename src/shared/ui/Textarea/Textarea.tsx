import { TextareaHTMLAttributes, forwardRef, ForwardedRef } from 'react';
import { FieldError } from 'react-hook-form';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Textarea.module.scss';
import { ErrorMessage } from '../ErrorMessage';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    error?: FieldError;
}

export const Textarea = forwardRef(
    (
        props: TextareaProps,
        ref: ForwardedRef<HTMLTextAreaElement>,
    ): JSX.Element => {
        const { className, error, ...otherProps } = props;

        return (
            <div
                className={classNames(cls['textarea-wrapper'], {}, [className])}
            >
                <textarea
                    ref={ref}
                    className={classNames(cls.textarea, {
                        [cls.error]: error?.message,
                    })}
                    {...otherProps}
                />
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
        );
    },
);
