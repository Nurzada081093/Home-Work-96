import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const AnonymousUserMenu = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px'}}>
      <Button variant="outlined" color={'inherit'} to={'/login'} component={NavLink}>Sign In</Button>
      <Button variant="outlined" color={'inherit'} to={'/register'} component={NavLink}>Sign Up</Button>
    </Box>
  );
};

export default AnonymousUserMenu;