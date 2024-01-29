import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppLogo from '@/shared/assets/icons/logo.svg';
import BurgerIcon from '@/shared/assets/icons/menuBurger.svg';
import CloseIcon from '@/shared/assets/icons/menuClose.svg';
import { Icon } from '@/shared/ui/Icon';
import cls from './Header.module.scss';
import { ProductsSearch } from '@/features/ProductsSearch';
import { Menu } from '@/entities/Menu';
import { motion, useReducedMotion } from 'framer-motion';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20,
            },
        },
        closed: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: '100%',
        },
    };

    return (
        <header className={classNames(cls.header, {}, [className])}>
            <Icon Svg={AppLogo} />
            <Icon
                className={cls.burger}
                Svg={BurgerIcon}
                variant="secondary"
                clickable
                onClick={() => setIsOpened(true)}
            />
            <motion.div
                className={cls.mobile}
                variants={variants}
                initial={'closed'}
                animate={isOpened ? 'opened' : 'closed'}
            >
                <Icon Svg={AppLogo} />
                <Icon
                    className={cls.close}
                    Svg={CloseIcon}
                    variant="secondary"
                    clickable
                    onClick={() => setIsOpened(false)}
                />
                <ProductsSearch className={cls.search} />
                <Menu className={cls.menu} />
            </motion.div>
        </header>
    );
};
