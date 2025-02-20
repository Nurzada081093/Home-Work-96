import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { cocktailsFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getCocktails } from '../cocktailsThunk.ts';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CocktailCards from '../components/CocktailCards/CocktailCards.tsx';
import { Typography } from '@mui/joy';
import { userFromSlice } from '../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';

const CocktailsContainer = () => {
  const cocktails = useAppSelector(cocktailsFromSlice);
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  if (user && user.role === 'admin') {
    navigate('/admin');
  }

  return (
    <Container>
      <Box>
        {cocktails.length > 0 ? <CocktailCards cocktails={cocktails}/>
          :
          <Typography
            level="h1"
            sx={{margin: '15%', textAlign: 'center'}}
          >
            No published cocktails yet!
          </Typography>
        }
      </Box>
    </Container>
  );
};

export default CocktailsContainer;