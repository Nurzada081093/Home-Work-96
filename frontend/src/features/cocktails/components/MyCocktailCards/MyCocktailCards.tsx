import { ICocktail } from '../../../../types';
import React from 'react';
import Box from '@mui/joy/Box';
import MyCocktailCard from './MyCocktailCard/MyCocktailCard.tsx';

interface Props {
  cocktails: ICocktail[];
}

const MyCocktailCards:React.FC<Props> = ({cocktails}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '40px 0'}}>
      {cocktails.map((cocktail) => (
        <MyCocktailCard cocktail={cocktail} key={cocktail._id}/>
      ))}
    </Box>
  );
};

export default MyCocktailCards;