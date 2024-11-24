import { modal, ingredients } from './constants';

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addingIngredient(
        ingredientData: string,
        constructorData: string,
        ingredientName: string
      ): Chainable<void>;
      checkIngredientModal(
        ingredientName: string,
        buttonClose: string,
        overlay: string
      ): Chainable<void>;
      addAllIngredientsToCart(): Chainable<void>;
    }
  }
}

// Добавление ингредиента в конструктор
Cypress.Commands.add('addingIngredient', (ingredientData, constructorData, ingredientName) => {
  cy.get(ingredientData)
    .should('exist') // Убедиться, что элемент существует
    .contains(ingredients.addButton)
    .click(); // Клик по кнопке добавления ингредиента
  cy.get(constructorData)
    .should('contain', ingredientName); // Проверка наличия ингредиента в конструкторе
});

// Добавление всех ингредиентов в конструктор
Cypress.Commands.add('addAllIngredientsToCart', () => {
  [ingredients.bun, ingredients.main, ingredients.sauce].forEach((item) => {
    cy.get(item.data)
      .should('exist') // Проверка, что категория существует
      .contains(ingredients.addButton)
      .click(); // Клик по кнопке добавления
  });
});

// Проверка модального окна для выбранного ингредиента
Cypress.Commands.add('checkIngredientModal', (ingredientName, buttonClose, overlay) => {
  // Открытие модального окна
  cy.contains(ingredientName) // Находим ингредиент по имени
    .should('exist') // Убедиться, что элемент существует
    .click(); // Клик по ингредиенту, чтобы открыть модальное окно

  // Проверка, что в модальном окне отображается правильное название ингредиента
  cy.contains('Детали ингредиента') // Проверка, что модальное окно открылось
    .should('exist');
  cy.contains(ingredientName) // Проверяем, что в модальном окне отображается имя ингредиента
    .should('exist'); 

  // Закрытие модального окна
  cy.get(buttonClose)
    .should('exist') // Проверка кнопки закрытия
    .click();
  cy.contains('Детали ингредиента')
    .should('not.exist'); // Проверка, что модальное окно закрыто

  // Повторное открытие модального окна
  cy.contains(ingredientName) // Находим ингредиент
    .should('exist')
    .click();
  cy.contains('Детали ингредиента')
    .should('exist'); // Проверка, что модальное окно открылось

  // Закрытие модального окна по клику на оверлей
  cy.get(overlay)
    .should('exist') // Проверка, что оверлей существует
    .click({ force: true }); // Принудительный клик
  cy.contains('Детали ингредиента')
    .should('not.exist'); // Проверка, что модальное окно закрыто
});

