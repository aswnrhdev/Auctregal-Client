import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
    const HOC = (props: any) => {
        const router = useRouter();
        const { token, role } = useSelector((state: RootState) => state.admin);

        useEffect(() => {
            if (!token || role !== 'admin') {
                router.push('/admin');
            }
        }, [token, role, router]);

        return <WrappedComponent {...props} />;
    };

    // Set a display name for the HOC component
    HOC.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return HOC;
};

export default withAdminAuth;
