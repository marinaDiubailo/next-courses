import { withLayout } from '@/app/layouts/MainLayout';

function Error500() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontSize: '32px',
                fontWeight: 'bold',
            }}
        >
            500 | An error occured!
        </div>
    );
}

export default withLayout(Error500);
