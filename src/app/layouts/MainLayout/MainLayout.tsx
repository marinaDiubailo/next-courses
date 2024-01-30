import {
    FunctionComponent,
    ReactNode,
    useState,
    KeyboardEvent,
    useRef,
} from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AppContextProvider } from '../../providers/context/AppContextProvider';
import { IAppContext } from '../../providers/context/store';
import { UpButton } from '@/features/UpButton';
import cls from './MainLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    const { children } = props;

    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
        useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    };

    return (
        <div className={cls.wrapper}>
            <button
                onFocus={() => setIsSkipLinkDisplayed(true)}
                tabIndex={0}
                className={classNames(cls['skip-link'], {
                    [cls.displayed]: isSkipLinkDisplayed,
                })}
                onKeyDown={skipContentAction}
            >
                Сразу к содержанию
            </button>
            <Header className={cls.header} />
            <Sidebar className={cls.sidebar} />
            <main
                className={cls.content}
                ref={bodyRef}
                tabIndex={0}
                role="main"
            >
                {children}
            </main>
            <Footer className={cls.footer} />
            <UpButton />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
    Component: FunctionComponent<T>,
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider
                menu={props.menu}
                firstCategory={props.firstCategory}
            >
                <MainLayout>
                    <Component {...props} />
                </MainLayout>
            </AppContextProvider>
        );
    };
};
