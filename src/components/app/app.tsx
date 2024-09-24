import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import ProtectedRoute from './ProtectedRoute';
import ProtectedModalRoute from './ProtectedModalRoute';

const App: FC = () => {
  const location = useLocation();
  const isModalOpen =
    location.pathname.includes('/feed/') ||
    location.pathname.includes('/ingredients/') ||
    location.pathname.includes('/profile/orders/');

  // Mock auth status - replace with actual auth logic
  const isLoggedIn = false; // replace this with actual authentication check

  const handleClose = () => {
    window.history.back(); // Закрытие модального окна
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Защищённые маршруты */}
        <Route
          path='/login'
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />

        {/* Модальные окна */}
        <Route
          path='/feed/:number'
          element={
            isModalOpen && (
              <Modal title='Order Info' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            )
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            isModalOpen && (
              <Modal title='Ingredient Details' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            )
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedModalRoute
              isLoggedIn={isLoggedIn}
              modalContent={
                isModalOpen && (
                  <Modal title='Order Info' onClose={handleClose}>
                    <OrderInfo />
                  </Modal>
                )
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
