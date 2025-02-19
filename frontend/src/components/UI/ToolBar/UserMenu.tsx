import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logoutUser } from '../../../features/users/usersThunk.ts';
import { clearUser } from '../../../features/users/usersSlice.ts';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/joy';
import { apiUrl } from '../../../globalConstants.ts';
import Typography from '@mui/material/Typography';
import { IUser } from '../../../types';

interface Props {
  user: IUser;
}

const UserMenu:React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearUser());
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0'}}>
      {user && (
        <Typography sx={{fontSize: '20px'}}>
          {user.displayName}
        </Typography>
      )}
      <Button color='inherit' onClick={handleClick} sx={{
        marginLeft: '10px'
      }}>
        {user && user.googleId !== null ?
          <Avatar alt={user.displayName} src={user.avatar} size="lg"/>
          :
          <Avatar alt={user?.displayName} src={apiUrl + '/' + user?.avatar} size="lg"/>
        }
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === 'admin' && <MenuItem onClick={() => {
          navigate('/admin');setAnchorEl(null);
        }}>Admin</MenuItem>}
        <MenuItem onClick={() => navigate('/newCocktail')}>Add new cocktail</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;