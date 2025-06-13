import DashboardLayout from '@/Layout';

interface Props {
  children: React.ReactNode;
  useLayout: boolean;
}

const ProtectedRoute = ({ children, useLayout }: Props) => {
  if (!useLayout) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
