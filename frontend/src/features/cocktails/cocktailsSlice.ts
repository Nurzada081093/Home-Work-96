import { createSlice } from '@reduxjs/toolkit';
import { ICocktail } from '../../types';
import { addCocktail, getCocktails, getUserCocktails } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface initialCocktailState {
  cocktails: ICocktail[];
  loadings: {
    addLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
    editLoading: boolean;
  },
  error: boolean;
}

const initialState: initialCocktailState = {
  cocktails: [],
  loadings: {
    addLoading: false,
    getLoading: false,
    deleteLoading: false,
    editLoading: false,
  },
  error: false,
}

export const cocktailsFromSlice = (state: RootState) => state.cocktails.cocktails;

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCocktail.pending, (state) => {
        state.loadings.addLoading = true;
        state.error = false;
      })
      .addCase(addCocktail.fulfilled, (state) => {
        state.loadings.addLoading = false;
        state.error = false;
      })
      .addCase(addCocktail.rejected, (state) => {
        state.loadings.addLoading = false;
        state.error = true;
      })
      .addCase(getCocktails.pending, (state) => {
        state.loadings.getLoading = true;
        state.error = false;
      })
      .addCase(getCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.loadings.getLoading = false;
        state.error = false;
        state.cocktails = cocktails;
      })
      .addCase(getCocktails.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      })
      .addCase(getUserCocktails.pending, (state) => {
        state.loadings.getLoading = true;
        state.error = false;
      })
      .addCase(getUserCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.loadings.getLoading = false;
        state.error = false;
        state.cocktails = cocktails;
      })
      .addCase(getUserCocktails.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;