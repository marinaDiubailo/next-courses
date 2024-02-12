import Link from 'next/link';
import { ProductsSearch } from '@/features/ProductsSearch';
import { Menu } from '@/entities/Menu';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppLogo from '@/shared/assets/icons/logo.svg';
import { Icon } from '@/shared/ui/Icon';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(cls.sidebar, {}, [className])}>
            <Link href="/">
                <Icon Svg={AppLogo} />
            </Link>
            <ProductsSearch />
            <Menu />
        </aside>
    );
};

Sidebar.displayName = 'Sidebar';
