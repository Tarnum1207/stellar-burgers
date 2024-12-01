import { expect, test } from '@jest/globals';
import { feedSlice, fetchFeeds, initialState } from './feedSlice';

describe('Тестирование feedSlice', () => {
  test('fetchFeeds.pending активирует загрузку', () => {
    const pendingAction = { type: fetchFeeds.pending.type };
    const updatedState = feedSlice.reducer(initialState, pendingAction);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBeNull(); 
  });

  test('fetchFeeds.fulfilled корректно обновляет feed и отключает загрузку', () => {
    const mockFeedData = {
      total: 100,
      totalToday: 10,
      orders: [{ id: '1', name: 'Order 1' }]
    };
    const fulfilledAction = {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedData
    };
    const newState = feedSlice.reducer(initialState, fulfilledAction);

    expect(newState.feed).toMatchObject({
      total: 100,
      totalToday: 10
    });
    expect(newState.orders).toHaveLength(1); 
    expect(newState.orders[0]).toMatchObject({ id: '1', name: 'Order 1' });
    expect(newState.isLoading).toBe(false);
  });

  test('fetchFeeds.rejected корректно устанавливает ошибку и завершает загрузку', () => {
    const mockError = 'Ошибка загрузки';
    const rejectedAction = {
      type: fetchFeeds.rejected.type,
      error: { message: mockError }
    };
    const resultState = feedSlice.reducer(initialState, rejectedAction);

    expect(resultState.error).toBe(mockError);
    expect(resultState.isLoading).toBe(false);
  });
});
