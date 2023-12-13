import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    size?: TextSize;
    children: ReactNode;
}

const mapSizeToClass: Record<TextSize, string> = {
    s: cls['size-s'],
    m: cls['size-m'],
    l: cls['size-l'],
};

export const Text = memo((props: TextProps): JSX.Element => {
    const { className, children, size = 'm' } = props;

    const sizeClass = mapSizeToClass[size];

    return (
        <p className={classNames('', {}, [className, sizeClass])}>{children}</p>
    );
});
