import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect, FC } from 'react';
import {
  fetchSubmitOrders,
  selectSubmittedOrders
} from '../../slices/activeOrdersSlice';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectSubmittedOrders);

  useEffect(() => {
    dispatch(fetchSubmitOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
