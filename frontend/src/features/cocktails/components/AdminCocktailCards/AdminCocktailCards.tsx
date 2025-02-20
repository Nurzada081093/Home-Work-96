import { ICocktail } from '../../../../types';
import Box from '@mui/joy/Box';
import React from 'react';
import AdminCocktailCard from './AdminCocktailCard/AdminCocktailCard.tsx';

interface Props {
  cocktails: ICocktail[];
}

const AdminCocktailCards:React.FC<Props> = ({cocktails}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '40px 0'
    }}>
      {cocktails.map((cocktail) => (
        <AdminCocktailCard cocktail={cocktail} key={cocktail._id}/>
      ))}
    </Box>
  );
};

export default AdminCocktailCards;