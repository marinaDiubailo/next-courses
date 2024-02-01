import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tag.module.scss';

type TagSize = 's' | 'm';
type TagColor = 'ghost' | 'red' | 'grey' | 'green' | 'primary';

const mapSizeToClass: Record<TagSize, string> = {
    s: cls.s,
    m: cls.m,
};

const mapColorToClass: Record<TagColor, string> = {
    ghost: cls.ghost,
    red: cls.red,
    grey: cls.grey,
    green: cls.green,
    primary: cls.primary,
};

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    size?: TagSize;
    color?: TagColor;
    children: ReactNode;
    href?: string;
}

export const Tag = memo((props: TagProps) => {
    const { className, children, size = 's', color = 'primary', href } = props;

    const additionalClasses = [
        className,
        mapSizeToClass[size],
        mapColorToClass[color],
    ];

    return (
        <div className={classNames(cls.tag, {}, additionalClasses)}>
            {href ? <a href={href} children></a> : children}
        </div>
    );
});
