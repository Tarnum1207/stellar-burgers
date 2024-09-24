import React, { useState, useRef, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types'; // Убедитесь, что тип TIngredient импортирован
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { RootState, AppDispatch } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(
    (state: RootState) => state.ingredients
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    dispatch(fetchIngredients() as any);
  }, [dispatch]);

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Добавляем типизацию для параметра ingredient
  const buns = ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'bun'
  );
  const mains = ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'main'
  );
  const sauces = ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'sauce'
  );

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
