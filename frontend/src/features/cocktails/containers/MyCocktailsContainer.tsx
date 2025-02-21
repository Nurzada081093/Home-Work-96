import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { myCocktailsFromSlice } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { getUserCocktails } from '../cocktailsThunk.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import Container from '@mui/material/Container';
import { Typography } from '@mui/joy';
import Box from '@mui/material/Box';
import MyCocktailCards from '../components/MyCocktailCards/MyCocktailCards.tsx';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const MyCocktailsContainer = () => {
  const cocktails = useAppSelector(myCocktailsFromSlice);
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getUserCocktails(user._id));
    }
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{textAlign: 'end', marginTop: '30px'}}>
        <Button
          startDecorator={<Add />}
          onClick={() => navigate('/newCocktail')}
        >
          Add new cocktail
        </Button>
      </Box>
      <Typography level="h1" sx={{textAlign: 'center'}}>My cocktails</Typography>
      <Box>
        {cocktails.length > 0 ? <MyCocktailCards cocktails={cocktails}/>
          :
          <Typography
            level="h1"
            sx={{margin: '10%', textAlign: 'center'}}
          >
            No cocktails yet!
          </Typography>
        }
      </Box>
    </Container>
  );
};

export default MyCocktailsContainer;