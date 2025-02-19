import { createSlice } from '@reduxjs/toolkit';
import { ICocktail } from '../../types';
import { addCocktail } from './cocktailsThunk.ts';

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
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;