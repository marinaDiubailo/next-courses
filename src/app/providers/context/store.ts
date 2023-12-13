import { MenuItem } from '@/shared/types/menu';
import { TopLevelCategory } from '@/shared/types/page';
import { createContext } from 'react';

export interface IAppContext {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
    menu: [],
    firstCategory: TopLevelCategory.Courses,
});
