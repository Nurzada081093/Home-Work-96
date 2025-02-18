import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousUserMenu from './AnonymousUserMenu.tsx';
import logo from '../../../assets/logo.jpg'

const ToolBar = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'rgba(44,38,38,0.98)'}}>
        <Container>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap'
          }}
          >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
              >
                <img style={{width: '80px', height: '80px'}} src={logo} alt="logo"/>
              </IconButton>
              <Typography
                variant="h4"
                component={NavLink}
                sx={{
                  flexGrow: 1,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '40px',
                }}
                to={'/'}>
                Cocktail
              </Typography>
            </Box>
            {user ? <UserMenu user={user}/> : <AnonymousUserMenu/>}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;