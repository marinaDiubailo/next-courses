import { PropsWithChildren, useState } from 'react';
import { MenuItem } from '@/shared/types/menu';
import { AppContext, IAppContext } from './store';

export const AppContextProvider = ({
    children,
    firstCategory,
    menu,
}: PropsWithChildren<IAppContext>): JSX.Element => {
    const [menuState, setMenuState] = useState<MenuItem[]>(menu);

    const setMenu = (newMenu: MenuItem[]) => {
        setMenuState(newMenu);
    };

    const value = {
        menu: menuState,
        firstCategory,
        setMenu,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
