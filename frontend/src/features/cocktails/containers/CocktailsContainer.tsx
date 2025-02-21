import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { cocktailsFromSlice, cocktailsLoadingFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getCocktails } from '../cocktailsThunk.ts';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CocktailCards from '../components/CocktailCards/CocktailCards.tsx';
import { Typography } from '@mui/joy';
import Loading from '../../../components/UI/Loading/Loading.tsx';

const CocktailsContainer = () => {
  const cocktails = useAppSelector(cocktailsFromSlice);
  const loading = useAppSelector(cocktailsLoadingFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  return (
    <Container>
      {loading ? <Loading/> :
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
      }
    </Container>
  );
};

export default CocktailsContainer;