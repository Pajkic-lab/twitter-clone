import { Loader } from '@tw/ui/components';
import { useAuthQuery } from '@tw/ui/data-access';
import { Navigate } from 'react-router-dom';
import { AccessRole } from './accessRole.type';

type PageManagerProps = {
  accessRole: AccessRole;
  children: JSX.Element;
};

export const PageManager = (props: PageManagerProps) => {
  const { children, accessRole } = props;

  const auth = useAuthQuery();

  const isAuth = !!auth.data?.data.payload?.id;
  const publicAccess = accessRole === AccessRole.Public;
  const privateAccess = accessRole === AccessRole.Private;

  const PageComponent = () =>
    auth.isFetching ? <Loader fullScreen /> : children;

  if (!isAuth) {
    if (publicAccess) return <PageComponent />;
    if (privateAccess) return <Navigate to={'/'} />;
  }
  if (isAuth) {
    if (privateAccess) return <PageComponent />;
    if (publicAccess) return <Navigate to={'/home'} />;
  }
};
