import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import {
  fetchIngredients,
  setSelectedIngredient
} from '../../slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  // Получаем ингредиенты, если их ещё нет
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  // Устанавливаем выбранный ингредиент
  useEffect(() => {
    if (ingredients.length && !ingredientData) {
      const selectedId = localStorage.getItem('selectedIngredient');
      const selectedIngredient = ingredients.find(
        (ingredient) => ingredient._id === selectedId
      );
      if (selectedIngredient) {
        dispatch(setSelectedIngredient(selectedIngredient));
      }
    }
  }, [ingredients, ingredientData, dispatch]);

  // Если ингредиент не выбран, показываем прелоадер
  if (!ingredientData) {
    return <Preloader />;
  }

  // Показываем детали ингредиента
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
