import PageContainer from '@/components/layout/PageContainer';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), { ssr: false });

const AdminPage = () => {
  return (
    <PageContainer scrollable>
      <div className="flex min-h-[35rem] max-h-fit w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs">
        <AdminDashboard />
      </div>
    </PageContainer>
  );
};

export default AdminPage;