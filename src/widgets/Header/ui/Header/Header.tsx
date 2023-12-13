import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header = memo((props: HeaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.header, {}, [className])}>Header</div>
    );
});
