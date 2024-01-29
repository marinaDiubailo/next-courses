import { FunctionComponent, ReactNode } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AppContextProvider } from '../../providers/context/AppContextProvider';
import { IAppContext } from '../../providers/context/store';
import cls from './MainLayout.module.scss';
import { UpButton } from '@/features/UpButton';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    const { children } = props;

    return (
        <div className={cls.wrapper}>
            <Header className={cls.header} />
            <Sidebar className={cls.sidebar} />
            <div className={cls.content}>{children}</div>
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
