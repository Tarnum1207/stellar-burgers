import { rootReducer } from './rootReducer';
import store from '../services/store';
import { expect, test } from '@jest/globals';

describe('Тестирование rootReducer', () => {
  test('Инициализация rootReducer с корректным начальными значениями', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(store.getState());
  });

  test('Возвращает текущее состояние при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = store.getState();

    const state = rootReducer(initialState, unknownAction);

    expect(state).toEqual(initialState);
  });
});
