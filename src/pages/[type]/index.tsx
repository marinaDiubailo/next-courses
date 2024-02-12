import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '@/app/layouts/MainLayout';
import { MenuItem } from '@/shared/types/menu';
import { firstLevelMenu } from '@/shared/consts/firstLevelMenu';
import { API } from '@/shared/api/api';

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}

function Type() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            Курсы OWL Top
        </div>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map((menu) => '/' + menu.route),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    const firstCategoryItem = firstLevelMenu.find(
        (category) => category.route === params.type,
    );

    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id,
    });

    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        },
    };
};
