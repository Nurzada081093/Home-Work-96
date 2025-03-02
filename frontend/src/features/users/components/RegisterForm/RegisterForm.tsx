import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { UserRegister } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { registerErrorFromSlice, registerLoadingFromSlice } from '../../usersSlice.ts';
import { googleLoginOrRegisterUser } from '../../usersThunk.ts';
import { toast } from 'react-toastify';
import FileInput from '../../../../components/FileInput/FileInput.tsx';
import { GoogleLogin } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';

interface Props {
  register: (user: UserRegister) => void;
}

const initialUserState = {
  email: '',
  password: '',
  displayName: '',
  avatar: null,
};

const RegisterForm: React.FC<Props> = ({register}) => {
  const [registerForm, setRegisterForm] = useState<UserRegister>(initialUserState);
  const registerError = useAppSelector(registerErrorFromSlice);
  const loading = useAppSelector(registerLoadingFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerForm.email.trim().length === 0 && registerForm.password.trim().length === 0 && registerForm.displayName.trim().length === 0) {
      toast.error('Fill in all fields!');
      return;
    }

    if (!registerForm.avatar) {
      toast.error('Please select an avatar!');
      return;
    }

    register({...registerForm});
  };

  const getError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const fileEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setRegisterForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const googleRegister = async (credential: string) => {
    await dispatch(googleLoginOrRegisterUser(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '15px 0',
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h4" variant="h5">
          Sign up
        </Typography>
        <Box sx={{pt: 2}}>
          <GoogleLogin onSuccess={((credentialResponse) => {
            if (credentialResponse.credential) {
              void googleRegister(credentialResponse.credential);
            }
          })} onError={() => alert('Login failed!')}/>
        </Box>
        <Box component="form" noValidate onSubmit={submitUser} sx={{ mt: 2, width: '80%' }}>
          <Grid container direction={'column'} spacing={1.5}>
            <Grid size={12}>
              <TextField
                type="email"
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={onChangeUser}
                error={Boolean(getError('email'))}
                helperText={getError('email')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="displayName"
                label="Display name"
                name="displayName"
                onChange={onChangeUser}
                error={Boolean(getError('displayName'))}
                helperText={getError('displayName')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangeUser}
                error={Boolean(getError('password'))}
                helperText={getError('password')}
              />
            </Grid>
            <Grid size={12}>
              <FileInput
                name="avatar"
                label="Avatar"
                onGetFile={fileEventChange}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up
            {loading ?  <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
