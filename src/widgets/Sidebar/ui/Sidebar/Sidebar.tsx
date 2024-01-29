import { memo } from 'react';
import { ProductsSearch } from '@/features/ProductsSearch';
import { Menu } from '@/entities/Menu';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppLogo from '@/shared/assets/icons/logo.svg';
import { Icon } from '@/shared/ui/Icon';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(cls.sidebar, {}, [className])}>
            <Icon Svg={AppLogo} />
            <ProductsSearch />
            <Menu />
        </aside>
    );
});
