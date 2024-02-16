import { Loader } from '@tw/ui/components';
import { useAuthQuery } from '@tw/ui/data-access';
import { AccessType } from '../types';

type LayoutWrapperProps = {
  accessType?: AccessType;
  children: JSX.Element;
};

// this should be refactored idk how but this is bad code... should be redesign
export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const auth = useAuthQuery();

  if (auth.isPending) {
    return <Loader fullScreen />;
  }

  // if (!auth.data) {
  //   return <Navigate to="/" />;
  // }

  return children;
};
