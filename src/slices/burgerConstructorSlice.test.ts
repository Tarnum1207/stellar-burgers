import {
  burgerConstructorSlice,
  addIngredientToConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  initialState
} from './burgerConstructorSlice';
import { expect, test } from '@jest/globals';

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const testIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: '2',
  name: 'Отбивная котлета',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

const sampleConstructorState = {
  bun: { ...testBun },
  ingredients: [
    { ...testIngredient, id: '2', name: 'Отбивная котлета' },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      id: '3',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 100,
      price: 500,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ]
};

describe('burgerConstructorSlice', () => {
  test('должен корректно добавлять булку в конструктор', () => {
    const action = addIngredientToConstructor(testBun);
    const newState = burgerConstructorSlice.reducer(initialState, action);

    expect(newState.bun).toMatchObject({
      _id: testBun._id,
      name: testBun.name,
      price: testBun.price,
      image: testBun.image
    });
  });

  test('должен добавлять новый ингредиент в список ингредиентов', () => {
    const action = addIngredientToConstructor(testIngredient);
    const updatedState = burgerConstructorSlice.reducer(initialState, action);

    expect(updatedState.ingredients).toHaveLength(1);
    expect(updatedState.ingredients[0]).toMatchObject({
      name: 'Отбивная котлета',
      type: 'main',
      price: 3000
    });
  });

  test('должен удалять ингредиент из конструктора по ID', () => {
    const action = deleteIngredientFromConstructor(
      sampleConstructorState.ingredients[0].id
    );
    const updatedState = burgerConstructorSlice.reducer(
      sampleConstructorState,
      action
    );

    expect(updatedState.ingredients).toHaveLength(1);
    expect(updatedState.ingredients[0].name).toBe('Соус фирменный Space Sauce');
  });

  test('должен корректно менять порядок ингредиентов', () => {
    const action = moveIngredientInConstructor({ from: 1, to: 0 });
    const resultState = burgerConstructorSlice.reducer(
      sampleConstructorState,
      action
    );

    expect(resultState.ingredients[0].name).toBe('Соус фирменный Space Sauce');
    expect(resultState.ingredients[1].name).toBe('Отбивная котлета');
  });
});
