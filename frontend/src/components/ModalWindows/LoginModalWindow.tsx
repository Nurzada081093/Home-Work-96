import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import React from 'react';
import LoginForm from '../../features/users/components/LoginForm/LoginForm.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../../types';
import { loginUser } from '../../features/users/usersThunk.ts';

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

const LoginModalWindow: React.FC<Props> = ({openModal = false, closeModal}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (user: UserLogin) => {
    await dispatch(loginUser({...user})).unwrap();
    navigate('/');
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={closeModal}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: '500px', borderRadius: 'md', boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" />
          <LoginForm login={login}/>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default LoginModalWindow;