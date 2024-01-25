import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ErrorMessage.module.scss';

interface ErrorMessageProps {
    className?: string;
    children: ReactNode;
}

export const ErrorMessage = memo((props: ErrorMessageProps) => {
    const { className, children } = props;

    return (
        <span className={classNames(cls['error-message'], {}, [className])}>
            {children}
        </span>
    );
});
