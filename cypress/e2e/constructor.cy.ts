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
      // Проверка, что ингредиент еще не добавлен в конструктор
      cy.get(item.constructor).should('not.contain', item.name);

      // Добавление ингредиента
      cy.addingIngredient(item.data, item.constructor, item.name);

      // Проверка, что ингредиент добавлен в конструктор
      cy.get(item.constructor).should('contain', item.name);
    });
  });

  it('Тестирование модальных окон для ингредиентов', () => {
  
  [ingredients.bun].forEach((item) => {
    // Проверка, что модальное окно не открыто перед действием
    cy.get('[data-cy="ingredientName"]').should('not.exist');
    
    // Проверка, что элемент не добавлен в конструктор
    cy.get(item.constructor).should('not.contain', item.name); 
    
    // Добавление элемента
    cy.addingIngredient(item.data, item.constructor, item.name);

    // Проверка, что элемент добавлена в конструктор
    cy.get(item.constructor).should('contain', item.name);

    // Проверка модального окна (открытие и закрытие)
    cy.checkIngredientModal(item.name, modal.closeButtonData, modal.overlayData);
  });
});

  it('Проверка создания заказа', () => {
    // Проверка, что конструктор пуст
    [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
      cy.get(item.constructor).should('not.contain', item.name);
    });

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
