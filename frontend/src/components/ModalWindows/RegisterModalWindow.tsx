import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import React from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { UserRegister } from '../../types';
import { registerUser } from '../../features/users/usersThunk.ts';
import RegisterForm from '../../features/users/components/RegisterForm/RegisterForm.tsx';

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

const RegisterModalWindow: React.FC<Props> = ({openModal = false, closeModal}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = async (user: UserRegister) => {
    await dispatch(registerUser({...user})).unwrap();
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
          <RegisterForm register={register}/>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterModalWindow;