import { useContext, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppContext } from '@/app/providers/context/store';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageItem } from '@/shared/types/menu';
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu';
import { FirstLevelMenuItem } from '@/shared/types/menu';
import { FirstLevelItem } from '../FirstLevelItem/FirstLeveIItem';
import cls from './Menu.module.scss';
interface MenuProps {
    className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props;

    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
        hidden: {
            marginBottom: 0,
        },
    };
    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: {
            opacity: 0,
            height: 0,
        },
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((menuItem) => {
                    if (menuItem._id.secondCategory === secondCategory) {
                        menuItem.isOpened = !menuItem.isOpened;
                    }
                    return menuItem;
                }),
            );
    };

    const buildFirstLevel = () => {
        return (
            <ul className={cls['first-level-list']}>
                {firstLevelMenu.map((category) => (
                    <li key={category.id}>
                        <FirstLevelItem
                            category={category}
                            isActive={category.id === firstCategory}
                        />
                        {category.id === firstCategory &&
                            buildSecondLevel(category)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (category: FirstLevelMenuItem) => {
        return (
            <ul className={cls['second-block']}>
                {menu.map((menuItem) => {
                    if (
                        menuItem.pages
                            .map((page) => page.alias)
                            .includes(router.asPath.split('/')[2])
                    ) {
                        menuItem.isOpened = true;
                    }
                    return (
                        <li key={menuItem._id.secondCategory}>
                            <button
                                type="button"
                                className={cls['second-level']}
                                onClick={() =>
                                    openSecondLevel(menuItem._id.secondCategory)
                                }
                            >
                                {menuItem._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={
                                    menuItem.isOpened ? 'visible' : 'hidden'
                                }
                                animate={
                                    menuItem.isOpened ? 'visible' : 'hidden'
                                }
                                className={cls['second-level-block']}
                            >
                                {buildThirdLevel(
                                    menuItem.pages,
                                    category.route,
                                    menuItem.isOpened ?? false,
                                )}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (
        pages: PageItem[],
        route: string,
        isOpened: boolean,
    ) => {
        return pages.map((page) => (
            <motion.li key={page._id} variants={variantsChildren}>
                <Link
                    tabIndex={isOpened ? 0 : -1}
                    className={classNames(cls['third-level'], {
                        [cls.active]:
                            `/${route}/${page.alias}` === router.asPath,
                    })}
                    href={`/${route}/${page.alias}`}
                >
                    {page.category}
                </Link>
            </motion.li>
        ));
    };

    return (
        <nav role="navigation" className={classNames('', {}, [className])}>
            {buildFirstLevel()}
        </nav>
    );
};
