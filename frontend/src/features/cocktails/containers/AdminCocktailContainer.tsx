import Container from '@mui/material/Container';
import { Typography } from '@mui/joy';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { cocktailsFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getCocktails } from '../cocktailsThunk.ts';
import AdminCocktailCards from '../components/AdminCocktailCards/AdminCocktailCards.tsx';

const AdminCocktailContainer = () => {
  const cocktails = useAppSelector(cocktailsFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  return (
    <Container>
      <Box>
        {cocktails.length > 0 ? <AdminCocktailCards cocktails={cocktails}/>
          :
          <Typography
            level="h1"
            sx={{margin: '15%', textAlign: 'center'}}
          >
            No cocktails yet!
          </Typography>
        }
      </Box>
    </Container>
  );
};

export default AdminCocktailContainer;