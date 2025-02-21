import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { cocktailsFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getCocktails } from '../cocktailsThunk.ts';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CocktailCards from '../components/CocktailCards/CocktailCards.tsx';
import { Typography } from '@mui/joy';

const CocktailsContainer = () => {
  const cocktails = useAppSelector(cocktailsFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

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