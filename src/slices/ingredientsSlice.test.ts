import { ingredientsSlice, fetchIngredients, initialState } from './ingredientsSlice';
import { expect, test } from '@jest/globals';

describe('Тестирование ingredientsSlice', () => {
  test('Устанавливает isLoading в true при fetchIngredients.pending', () => {
    const pendingAction = { type: fetchIngredients.pending.type };
    const updatedState = ingredientsSlice.reducer(initialState, pendingAction);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBeNull(); 
  });

  test('fetchIngredients.fulfilled сохраняет полученные данные', () => {
    const mockIngredients = [{ id: '1', name: 'Булка' }];
    const fulfilledAction = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const newState = ingredientsSlice.reducer(initialState, fulfilledAction);

    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({ id: '1', name: 'Булка' });
  });

  test('fetchIngredients.rejected корректно устанавливает ошибку', () => {
    const mockError = 'Ошибка загрузки данных';
    const rejectedAction = { type: fetchIngredients.rejected.type, error: { message: mockError } };
    const resultState = ingredientsSlice.reducer(initialState, rejectedAction);

    expect(resultState.isLoading).toBe(false);
    expect(resultState.error).toBe(mockError);
  });
});
