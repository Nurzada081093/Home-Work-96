import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktail, ICocktailForm, ValidationError } from '../../types';
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

export const getCocktails = createAsyncThunk<ICocktail[], void>(
  'cocktails/getCocktails',
  async () => {
    const response = await axiosRequest(`/cocktails`);
    return response.data || [];
  }
);

export const getUserCocktails = createAsyncThunk<ICocktail[], string>(
  'cocktails/getUserCocktails',
  async (cocktailId) => {
    const response = await axiosRequest(`/cocktails?user=${cocktailId}`);
    return response.data || [];
  }
);

export const deleteCocktail = createAsyncThunk<void, {cocktailId: string, token: string}>(
  'cocktails/deleteCocktail',
  async ({cocktailId, token}) => {
    await axiosRequest.delete(`/cocktails/${cocktailId}`, {headers: {'Authorization': token}});
  }
);

export const publishCocktail = createAsyncThunk<void, {cocktailId: string, token: string}>(
  'cocktails/publishCocktail',
  async ({cocktailId, token}) => {
    await axiosRequest.patch(`/cocktails/${cocktailId}/togglePublished`, {headers: {'Authorization': token}});
  }
);

export const getCocktail = createAsyncThunk<ICocktail, string>(
  'cocktails/getCocktail',
  async (cocktailId) => {
    const response = await axiosRequest(`/cocktails/${cocktailId}`);
    return response.data || null;
  }
);