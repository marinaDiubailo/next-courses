import { withLayout } from '@/app/layouts/MainLayout'

export function Error404() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        fontSize: '32px',
        fontWeight: 'bold',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      404 | An error occured!
    </div>
  )
}

export default withLayout(Error404)
