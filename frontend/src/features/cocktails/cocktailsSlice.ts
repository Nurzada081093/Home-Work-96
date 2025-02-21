import { createSlice } from '@reduxjs/toolkit';
import { ICocktail } from '../../types';
import {
  addCocktail,
  deleteCocktail,
  getCocktail,
  getCocktails,
  getUserCocktails,
  publishCocktail
} from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface initialCocktailState {
  cocktails: ICocktail[];
  myCocktails: ICocktail[];
  cocktail: ICocktail | null;
  loadings: {
    addLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
    editLoading: boolean;
    getCocktailLoading: boolean;
  },
  error: boolean;
}

const initialState: initialCocktailState = {
  cocktails: [],
  myCocktails: [],
  cocktail: null,
  loadings: {
    addLoading: false,
    getLoading: false,
    deleteLoading: false,
    editLoading: false,
    getCocktailLoading: false,
  },
  error: false,
}

export const cocktailsFromSlice = (state: RootState) => state.cocktails.cocktails;
export const myCocktailsFromSlice = (state: RootState) => state.cocktails.myCocktails;
export const cocktailFromSlice = (state: RootState) => state.cocktails.cocktail;

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
        state.myCocktails = cocktails;
      })
      .addCase(getUserCocktails.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      })
      .addCase(deleteCocktail.pending, (state) => {
        state.loadings.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.loadings.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.loadings.deleteLoading = false;
        state.error = true;
      })
      .addCase(publishCocktail.pending, (state) => {
        state.loadings.editLoading = true;
        state.error = false;
      })
      .addCase(publishCocktail.fulfilled, (state) => {
        state.loadings.editLoading = false;
        state.error = false;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.loadings.editLoading = false;
        state.error = true;
      })
      .addCase(getCocktail.pending, (state) => {
        state.loadings.getCocktailLoading = true;
        state.error = false;
      })
      .addCase(getCocktail.fulfilled, (state, {payload: cocktail}) => {
        state.loadings.getCocktailLoading = false;
        state.error = false;
        state.cocktail = cocktail;
      })
      .addCase(getCocktail.rejected, (state) => {
        state.loadings.getCocktailLoading = false;
        state.error = true;
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;