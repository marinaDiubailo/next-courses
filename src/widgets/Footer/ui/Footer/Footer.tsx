import { memo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
    const { className } = props;

    return (
        <footer className={classNames(cls.footer, {}, [className])}>
            <div className={cls.rights}>
                OwlTop © 2020 - {format(new Date(), 'yyyy')}{' '}
                <span>Все права защищены</span>
            </div>
            <Link href="/a">Пользовательское соглашение</Link>
            <Link href="/n">Политика конфиденциальности</Link>
        </footer>
    );
});

Footer.displayName = 'Footer';
