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
                component={NavLink}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                to={'/'}
              >
                <img style={{width: '80px', height: '80px'}} src={logo} alt="logo"/>
              </IconButton>
              <Typography
                variant="h4"
                component={NavLink}
                sx={{
                  flexGrow: 1,
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, #f83600, #f9d423)',
                  WebkitBackgroundClip: 'text',
                  fontWeight: 'bold',
                  fontSize: '40px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundPosition: 'right center',
                    color: '#fff',
                    textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
                  },
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