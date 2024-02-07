import { GetStaticProps } from 'next';
import axios from 'axios';
import { withLayout } from '@/app/layouts/MainLayout';
import { MenuItem } from '@/shared/types/menu';
import { API } from '@/shared/api/api';

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}

function Home(props: HomeProps) {
    const { menu } = props;

    return (
        <>
            <ul>
                {menu.map((m) => (
                    <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
                ))}
            </ul>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory,
    });
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};
