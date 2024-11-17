import { profileSlice, getUser, initialState } from './profileUserSlice';
import { expect, test } from '@jest/globals';

describe('Тестирование profileUserSlice', () => {
  test('`getUser.pending` включает состояние загрузки', () => {
    const pendingAction = { type: getUser.pending.type };
    const updatedState = profileSlice.reducer(initialState, pendingAction);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBeNull();
  });

  test('`getUser.fulfilled` сохраняет данные пользователя', () => {
    const userPayload = { name: 'Иван', email: 'ivan@mail.ru' };
    const fulfilledAction = {
      type: getUser.fulfilled.type,
      payload: { user: userPayload }
    };
    const updatedState = profileSlice.reducer(initialState, fulfilledAction);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.user).toEqual(userPayload);
  });

  test('`getUser.rejected` обрабатывает ошибку', () => {
    const errorMessage = 'Ошибка выполнения';
    const rejectedAction = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };
    const updatedState = profileSlice.reducer(initialState, rejectedAction);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(errorMessage);
  });
});
