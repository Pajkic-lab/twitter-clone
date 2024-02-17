import { Loader } from '@tw/ui/components';
import { useAuthQuery } from '@tw/ui/data-access';
import { Navigate } from 'react-router-dom';
import { AccessType } from './access.type';

type PageWrapperProps = {
  accessType: AccessType;
  children: JSX.Element;
};

export const PageWrapper = ({ children, accessType }: PageWrapperProps) => {
  const { data, isFetching } = useAuthQuery();

  const privateAccess = accessType === AccessType.Private;
  const publicAccess = accessType === AccessType.Public;
  const isAuth = Boolean(data?.data.payload.user.id);

  const PageComponent = () => (isFetching ? <Loader fullScreen /> : children);

  if (!isAuth) {
    if (publicAccess) return <PageComponent />;
    if (privateAccess) return <Navigate to={'/'} />;
  }
  if (isAuth) {
    if (privateAccess) return <PageComponent />;
    if (publicAccess) return <Navigate to={'/home'} />;
  }
};
