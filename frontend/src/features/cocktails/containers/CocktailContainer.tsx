import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCocktail } from '../cocktailsThunk.ts';
import { cocktailFromSlice } from '../cocktailsSlice.ts';
import Box from '@mui/joy/Box';
import { apiUrl } from '../../../globalConstants.ts';
import Container from '@mui/material/Container';
import { Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

const CocktailContainer = () => {
  const cocktail = useAppSelector(cocktailFromSlice);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getCocktail(id)).unwrap();
    }
  }, [dispatch, id]);

  return cocktail && (
    <Container>
      <Box sx={{
        margin: '30px 0',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        <Box>
          <img
            style={{width: '350px', height: '350px', borderRadius: '10%'}}
            srcSet={`${apiUrl + '/' + cocktail.image}`}
            src={`${apiUrl + '/' + cocktail.image}`}
            alt={cocktail.title}
            loading="lazy"
          />
        </Box>
        <Box sx={{margin: '20px 0 0 30px'}}>
          <Typography level="h1" sx={{marginBottom: '20px'}}>{cocktail.title}</Typography>
          <div>
            <Typography
              id="decorated-list-demo"
              level="body-md"
              sx={{textTransform: 'uppercase', fontWeight: 'lg', mb: 1}}
            >
              Ingredients:
            </Typography>
            <List marker='disc'>
              {cocktail.ingredients.map((ingredient, index) => (
                <ListItem
                  key={ingredient.ingredientName + index}
                >
                  <b>{ingredient.ingredientName}</b> - {ingredient.amount}
                </ListItem>
              ))}
            </List>
          </div>
        </Box>
      </Box>
      <Box sx={{marginBottom: '30px'}}>
        <Typography
          id="decorated-list-demo"
          level="body-md"
          sx={{textTransform: 'uppercase', fontWeight: 'lg', mb: 1}}
        >
          Recipe:
        </Typography>
        <Typography>{cocktail.recipe}</Typography>
      </Box>
    </Container>
  );
};

export default CocktailContainer;