import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { myCocktailsFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getUserCocktails } from '../cocktailsThunk.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import Container from '@mui/material/Container';
import { Typography } from '@mui/joy';
import Box from '@mui/material/Box';
import MyCocktailCards from '../components/MyCocktailCards/MyCocktailCards.tsx';

const MyCocktailsContainer = () => {
  const cocktails = useAppSelector(myCocktailsFromSlice);
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserCocktails(user._id));
    }
  }, [dispatch]);

  return (
    <Container>
      <Box>
        {cocktails.length > 0 ? <MyCocktailCards cocktails={cocktails}/>
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

export default MyCocktailsContainer;