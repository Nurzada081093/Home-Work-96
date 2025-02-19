import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktailForm, ValidationError } from '../../types';
import axiosRequest from '../../axiosRequest.ts';
import { isAxiosError } from 'axios';

export const addCocktail = createAsyncThunk<void, {cocktail: ICocktailForm, token: string }, {rejectValue: ValidationError}>(
  'cocktails/addCocktail',
  async ({cocktail, token}, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('title', cocktail.title);

      if (cocktail.image) {
        formData.append('image', cocktail.image);
      }

      formData.append('recipe', cocktail.recipe);
      formData.append('ingredients', JSON.stringify(cocktail.ingredients));

      await axiosRequest.post('/cocktails', formData, {headers: {'Authorization': token}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

