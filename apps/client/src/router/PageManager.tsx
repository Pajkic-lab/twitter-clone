import { Loader } from '@tw/ui/components';
import { useAuthQuery } from '@tw/ui/data-access';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { AccessRole } from './accessRole.type';

type PageManagerProps = {
  children: JSX.Element;
  accessRole: AccessRole;
};

export const PageManager = (props: PageManagerProps) => {
  const { children, accessRole } = props;

  const auth = useAuthQuery();

  const publicAccess = accessRole === AccessRole.Public;
  const privateAccess = accessRole === AccessRole.Private;
  const isAuth = useMemo(() => !!auth.data?.data.payload?.id, [auth]);

  const PageComponent = () => {
    return auth.isFetching ? <Loader fullScreen /> : children;
  };

  if (!isAuth) {
    if (publicAccess) return <PageComponent />;
    if (privateAccess) return <Navigate to={'/'} />;
  }
  if (isAuth) {
    if (privateAccess) return <PageComponent />;
    if (publicAccess) return <Navigate to={'/home'} />;
  }
};
