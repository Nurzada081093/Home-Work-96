import React, { useState } from 'react';
import LoginModalWindow from '../ModalWindows/LoginModalWindow.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { clearLoginError } from '../../features/users/usersSlice.ts';

interface ProtectedRouteProps extends React.PropsWithChildren {
  isAllowed: boolean | null;
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({isAllowed, children}) => {
  const [openLogin, setOpenLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const closeLoginModal = () => {
    setOpenLogin(false);
    dispatch(clearLoginError());
  };

  if (!isAllowed) {
    return <LoginModalWindow openModal={openLogin} closeModal={closeLoginModal}/>;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;