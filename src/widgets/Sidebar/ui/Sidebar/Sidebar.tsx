import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Menu } from '@/entities/Menu';
import AppLogo from '@/shared/assets/icons/logo.svg';
import cls from './Sidebar.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { ProductsSearch } from '@/features/ProductsSearch';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.sidebar, {}, [className])}>
            <Icon Svg={AppLogo} />
            <ProductsSearch />
            <Menu />
        </div>
    );
});
