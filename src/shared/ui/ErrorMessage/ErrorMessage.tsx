import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ErrorMessage.module.scss';

interface ErrorMessageProps {
    className?: string;
    children: ReactNode;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    const { className, children } = props;

    return (
        <span
            role="alert"
            className={classNames(cls['error-message'], {}, [className])}
        >
            {children}
        </span>
    );
};

ErrorMessage.displayName = 'ErrorMessage';
