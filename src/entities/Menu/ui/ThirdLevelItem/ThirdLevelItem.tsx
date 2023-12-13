import { memo, ReactNode } from 'react';
import Link from 'next/link';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThirdLevelItem.module.scss';

interface ThirdLevelItemProps {
    className?: string;
    href: string;
    isActive: boolean;
    children: ReactNode;
}

export const ThirdLevelItem = memo(
    (props: ThirdLevelItemProps): JSX.Element => {
        const { className, href, isActive, children } = props;

        return (
            <Link
                href={href}
                className={classNames(
                    cls['third-level'],
                    { [cls.active]: isActive },
                    [className],
                )}
            >
                {children}
            </Link>
        );
    },
);
