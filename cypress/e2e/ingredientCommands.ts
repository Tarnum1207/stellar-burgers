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
  // Клик по ингредиенту
  cy.contains(ingredientName) // Находим ингредиент по имени
    .should('exist') // Проверяем, что элемент существует
    .click(); // Кликаем по ингредиенту
  // Проверка, что модальное окно открылось и в нём отображается корректный ингредиент
  cy.get('[data-cy="ingredientName"]').within(() => {
    // Проверяем, что имя ингредиента отображается в модальном окне
    cy.contains(ingredientName).should('exist');
  });

  // Закрытие модального окна через кнопку
  cy.get(buttonClose)
    .should('exist') // Проверяем наличие кнопки закрытия
    .click();
  cy.get('[data-cy="Modal"]') // Убедимся, что модальное окно закрылось
    .should('not.exist');

  // Повторное открытие модального окна
  cy.contains(ingredientName) // Снова находим ингредиент
    .should('exist')
    .click();
  cy.get('[data-cy="ingredientName"]').within(() => {
    cy.contains(ingredientName).should('exist'); // Проверяем, что ингредиент отображается
  });

  // Закрытие модального окна через клик на оверлей
  cy.get(overlay)
    .should('exist') // Проверяем наличие оверлея
    .click({ force: true }); // Принудительный клик на оверлей
  cy.get('[data-cy="modalOverlay"]') // Проверяем, что модальное окно закрылось
    .should('not.exist');
});


