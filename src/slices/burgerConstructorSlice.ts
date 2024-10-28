import { nanoid, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorState: (state) => state
  },
  reducers: {
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() }
      }),

      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    deleteIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );

      if (ingredientIndex >= 0) {
        state.ingredients.splice(ingredientIndex, 1); // Удаляем элемент по индексу
      }
    },
    moveIngredientInConstructor: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;

      if (from !== to) {
        const [movedIngredient] = state.ingredients.splice(from, 1);
        state.ingredients.splice(to, 0, movedIngredient);
      }
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredientToConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  clearConstructor
} = burgerConstructorSlice.actions;

export const { getConstructorState } = burgerConstructorSlice.selectors;
