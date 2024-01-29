import { memo, useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppContext } from '@/app/providers/context/store';
import { PageItem } from '@/shared/types/menu';
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu';
import { FirstLevelMenuItem } from '@/shared/types/menu';
import { FirstLevelItem } from '../FirstLevelItem/FirstLeveIItem';
import { ThirdLevelItem } from '../ThirdLevelItem/ThirdLevelItem';
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
            <>
                {firstLevelMenu.map((category) => (
                    <div
                        key={category.id}
                        className={classNames(cls['first-level'], {}, [
                            className,
                        ])}
                    >
                        <FirstLevelItem
                            category={category}
                            isActive={category.id === firstCategory}
                        />
                        {category.id === firstCategory &&
                            buildSecondLevel(category)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (category: FirstLevelMenuItem) => {
        return (
            <div className={cls['second-block']}>
                {menu.map((menuItem) => {
                    if (
                        menuItem.pages
                            .map((page) => page.alias)
                            .includes(router.asPath.split('/')[2])
                    ) {
                        menuItem.isOpened = true;
                    }
                    return (
                        <div key={menuItem._id.secondCategory}>
                            <div
                                className={cls['second-level']}
                                onClick={() =>
                                    openSecondLevel(menuItem._id.secondCategory)
                                }
                            >
                                {menuItem._id.secondCategory}
                            </div>
                            <motion.div
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
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((page) => (
            <motion.div key={page._id} variants={variantsChildren}>
                <ThirdLevelItem
                    key={page._id}
                    href={`/${route}/${page.alias}`}
                    isActive={`/${route}/${page.alias}` === router.asPath}
                >
                    {page.category}
                </ThirdLevelItem>
            </motion.div>
        ));
    };

    return <nav className={cls.menu}>{buildFirstLevel()}</nav>;
};
