import { expect, test } from '@jest/globals';
import {
  submittedOrdersSlice,
  fetchSubmitOrders,
  initialState
} from './activeOrdersSlice';

describe('submittedOrdersSlice', () => {
  test('должен включить fetchingStatus при вызове fetchSubmitOrders.pending', () => {
    const pendingAction = { type: fetchSubmitOrders.pending.type };
    const newState = submittedOrdersSlice.reducer(initialState, pendingAction);

    expect(newState.fetchingStatus).toBe(true);
    expect(newState.orders).toHaveLength(0);
    expect(newState.error).toBeNull();
  });

  test('должен обновить список заказов и выключить fetchingStatus при fetchSubmitOrders.fulfilled', () => {
    const mockOrders = [{ id: '123', name: 'Test Order' }];
    const fulfilledAction = {
      type: fetchSubmitOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = submittedOrdersSlice.reducer(initialState, fulfilledAction);

    expect(newState.orders).toStrictEqual(mockOrders);
    expect(newState.fetchingStatus).toBe(false);
    expect(newState.error).toBeNull();
  });

  test('должен установить сообщение об ошибке и выключить fetchingStatus при fetchSubmitOrders.rejected', () => {
    const error = 'Ошибка загрузки данных';
    const rejectedAction = {
      type: fetchSubmitOrders.rejected.type,
      error: { message: error }
    };
    const newState = submittedOrdersSlice.reducer(initialState, rejectedAction);

    expect(newState.error).toBe(error);
    expect(newState.fetchingStatus).toBe(false);
    expect(newState.orders).toEqual([]);
  });
});
