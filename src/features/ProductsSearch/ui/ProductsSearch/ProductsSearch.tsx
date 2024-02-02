import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Icon } from '@/shared/ui/Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';
import cls from './ProductsSearch.module.scss';
import { Button } from '@/shared/ui/Button';

interface ProductsSearchProps {
    className?: string;
}

export const ProductsSearch = (props: ProductsSearchProps) => {
    const { className, ...otherProps } = props;
    const router = useRouter();

    const [search, setSearch] = useState<string>('');

    const navigateToSearchPage = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search,
            },
        });
    };

    const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') navigateToSearchPage();
    };

    return (
        <form
            role="search"
            className={classNames(cls.search, {}, [className])}
            {...otherProps}
        >
            <Input
                placeholder="Поиск..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={keyDownHandler}
            />
            <Button
                className={cls.button}
                onClick={navigateToSearchPage}
                aria-label="Искать по сайту"
                small
            >
                <Icon Svg={SearchIcon} />
            </Button>
        </form>
    );
};

ProductsSearch.displayName = 'ProductSearch';
