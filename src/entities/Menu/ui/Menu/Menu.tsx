import { memo, useContext } from 'react';
import { useRouter } from 'next/router';
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

export const Menu = memo((props: MenuProps): JSX.Element => {
    const { className } = props;

    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();

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
                            <div
                                className={classNames(
                                    cls['second-level-block'],
                                    { [cls.opened]: menuItem.isOpened },
                                    [className],
                                )}
                            >
                                {buildThirdLevel(
                                    menuItem.pages,
                                    category.route,
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((page) => (
            <ThirdLevelItem
                key={page._id}
                href={`/${route}/${page.alias}`}
                isActive={`/${route}/${page.alias}` === router.asPath}
            >
                {page.category}
            </ThirdLevelItem>
        ));
    };

    return <div className={cls.menu}>{buildFirstLevel()}</div>;
});
