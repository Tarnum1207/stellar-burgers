import { ordersSlice, fetchOrders, clearOrders, initialState } from './ordersSlice';
import { expect, test } from '@jest/globals';

describe('Тестирование ordersSlice', () => {
  const testOrder = {
    _id: '671239b2d829be001c776eb8',
    number: 56854,
    status: 'done',
    name: 'Флюоресцентный space экзо-плантаго люминесцентный метеоритный бургер',
    createdAt: '2024-10-18T10:34:26.623Z',
    updatedAt: '2024-10-18T10:34:27.349Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943']
  };

  test('`fetchOrders.pending` включает состояние загрузки', () => {
    const pendingAction = { type: fetchOrders.pending.type };
    const updatedState = ordersSlice.reducer(initialState, pendingAction);

    expect(updatedState.loading).toBe(true);
    expect(updatedState.orderClaim).toBe(true);
    expect(updatedState.orderError).toBeNull();
  });

  test('`fetchOrders.fulfilled` сохраняет детали заказа', () => {
    const fulfilledAction = {
      type: fetchOrders.fulfilled.type,
      payload: { order: testOrder }
    };
    const updatedState = ordersSlice.reducer(initialState, fulfilledAction);

    expect(updatedState.loading).toBe(false);
    expect(updatedState.orderDetails).toMatchObject(testOrder);
    expect(updatedState.orderClaim).toBe(false);
  });

  test('`fetchOrders.rejected` обрабатывает ошибку', () => {
    const errorMessage = 'Ошибка создания заказа';
    const rejectedAction = {
      type: fetchOrders.rejected.type,
      error: { message: errorMessage }
    };
    const updatedState = ordersSlice.reducer(initialState, rejectedAction);

    expect(updatedState.loading).toBe(false);
    expect(updatedState.orderError).toBe(errorMessage);
  });

  test('`clearOrders` сбрасывает детали заказа', () => {
    const stateWithOrderDetails = { ...initialState, orderDetails: testOrder };
    const clearAction = clearOrders();
    const updatedState = ordersSlice.reducer(stateWithOrderDetails, clearAction);

    expect(updatedState.orderDetails).toBeNull();
  });
});
