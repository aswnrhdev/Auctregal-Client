








import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const { token, role } = useSelector((state: RootState) => state.admin);

        useEffect(() => {
            // Redirect if no token or role is not 'admin'
            if (!token || role !== 'admin') {
                router.push('/admin');
            }
        }, [token, role, router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAdminAuth;

