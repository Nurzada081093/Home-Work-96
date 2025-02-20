import { ICocktail } from '../../../../types';
import React from 'react';
import CocktailCard from './CocktailCard/CocktailCard.tsx';
import Box from '@mui/joy/Box';

interface Props {
  cocktails: ICocktail[];
}

const CocktailCards:React.FC<Props> = ({cocktails}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', margin: '40px 0'}}>
      {cocktails.map((cocktail) => (
        <CocktailCard cocktail={cocktail} key={cocktail._id}/>
      ))}
    </Box>
  );
};

export default CocktailCards;