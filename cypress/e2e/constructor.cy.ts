import { ingredients, modal, globalInfo } from './constants';

describe('Тестирование страницы конструктора бургера', () => {
  beforeEach(() => {
    // Имитация запросов и установка начальных данных
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', '/api/orders', { fixture: 'orders.json' }).as('createOrder');
    cy.intercept('GET', '/api/auth/user', { fixture: 'profileUser.json' }).as('getUser');

    // Настройка токенов для сессии пользователя
    cy.setCookie('accessToken', 'testAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');

    // Переход на главную страницу и ожидание загрузки данных
    cy.visit(globalInfo.localUrl);
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очистка данных после тестов
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиентов в конструктор', () => {
    // Добавление ингредиентов различных типов в конструктор
    [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
      cy.addingIngredient(item.data, item.constructor, item.name);
    });

    // Проверка, что все ингредиенты добавлены
    [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
      cy.get(item.constructor).should('contain', item.name);
    });
  });

  it('Тестирование модальных окон для ингредиентов', () => {
    // Проверка открытия и закрытия модальных окон для каждого типа ингредиента
    [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
      cy.checkIngredientModal(item.name, modal.closeButtonData, modal.overlayData);
    });
  });

  it('Проверка создания заказа', () => {
    // Добавление всех необходимых ингредиентов в заказ
    cy.addAllIngredientsToCart();

    // Оформление заказа
    cy.get(globalInfo.createOrderBtnData).click();

    // Ожидание выполнения запроса на создание заказа
    cy.wait('@createOrder');

    // Проверка номера заказа
    cy.contains(globalInfo.orderNumber).should('exist');

    // Закрытие модального окна и проверка очистки конструктора
    cy.get(modal.overlayData).click({ force: true });
    cy.contains(globalInfo.orderNumber).should('not.exist');

    // Проверка, что конструктор очищен
    [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
      cy.get(item.constructor).should('not.contain', item.name);
    });
  });
});
