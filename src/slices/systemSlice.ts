// src/slices/systemSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  getIngredientsApi,
  updateUserApi
} from '../utils/burger-api';
import { TUser, TIngredient } from '../utils/types';

interface SystemState {
  user: TUser | null;
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: SystemState = {
  user: null,
  ingredients: [],
  loading: false,
  error: null
};

// Thunk для получения данных пользователя
export const fetchUser = createAsyncThunk(
  'system/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки данных пользователя');
    }
  }
);

// Thunk для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'system/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'system/updateUser',
  async (userData: Partial<TUser>, { rejectWithValue }) => {
    try {
      const user = await updateUserApi(userData);
      return user;
    } catch (err) {
      return rejectWithValue('Ошибка обновления пользователя');
    }
  }
);

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Ingredients
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const systemReducer = systemSlice.reducer;
