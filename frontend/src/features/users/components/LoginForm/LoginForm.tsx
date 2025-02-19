import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Avatar, CircularProgress } from '@mui/material';
import { UserLogin } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { loginErrorFromSlice, loginLoadingFromSlice } from '../../usersSlice.ts';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { googleLoginOrRegisterUser } from '../../usersThunk.ts';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface Props {
  login: (user: UserLogin) => void;
}

const initialUserState = {
  email: '',
  password: ''
};

const LoginForm: React.FC<Props> = ({login}) => {
  const [loginForm, setLoginForm] = useState<UserLogin>(initialUserState);
  const loginError = useAppSelector(loginErrorFromSlice);
  const loading = useAppSelector(loginLoadingFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const {name, value} = e.target;

    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginForm.email.trim().length === 0 || loginForm.password.trim().length === 0) {
      toast.error("Fill in the email and password!");
    } else {
      login({...loginForm});
    }
  };

  const googleLogin = async (credential: string) => {
    await dispatch(googleLoginOrRegisterUser(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          // marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px 0',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError && (
          <Alert severity="error" sx={{mt: 3, width: '80%'}}>
            {loginError.error}
          </Alert>
        )}
        <Box sx={{pt: 2}}>
          <GoogleLogin onSuccess={((credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLogin(credentialResponse.credential);
            }
          })} onError={() => alert('Login failed!')}/>
        </Box>
        <Box component="form" noValidate onSubmit={submitUser} sx={{mt: 3}}>
          <Grid container direction={'column'} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={onChangeUser}
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
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 2, mb: 2}}
          >
            Sign In
            {loading ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <NavLink to={'/register'}>
                No account yet? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;