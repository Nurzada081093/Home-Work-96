import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import LoginModalWindow from '../../ModalWindows/LoginModalWindow.tsx';
import RegisterModalWindow from '../../ModalWindows/RegisterModalWindow.tsx';
import { clearLoginError, clearRegisterError } from '../../../features/users/usersSlice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';

const AnonymousUserMenu = () => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const closeLoginModal = () => {
    setOpenLogin(false);
    dispatch(clearLoginError());
  };

  const closeRegisterModal = () => {
    setOpenRegister(false);
    dispatch(clearRegisterError());
  };

  return (
    <>
      <LoginModalWindow openModal={openLogin} closeModal={closeLoginModal}/>
      <RegisterModalWindow openModal={openRegister} closeModal={closeRegisterModal}/>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '230px'}}>
        <Button variant="outlined" color={'inherit'} onClick={() => setOpenLogin(true)}
          sx={{
            width: '100px',
            color: 'transparent',
            backgroundImage: 'linear-gradient(to right, #f83600, #f9d423)',
            WebkitBackgroundClip: 'text',
            fontSize: '17px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundPosition: 'right center',
              color: '#fff',
              textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
            },
          }}
        >Sign In</Button>
        <Button variant="outlined" color={'inherit'} onClick={() => setOpenRegister(true)}
          sx={{ width: '120px',
            color: 'transparent',
            backgroundImage: 'linear-gradient(to right, #f83600, #f9d423)',
            WebkitBackgroundClip: 'text',
            fontSize: '17px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundPosition: 'right center',
              color: '#fff',
              textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
            },
          }}
        >Sign Up</Button>
      </Box>
    </>
  );
};

export default AnonymousUserMenu;