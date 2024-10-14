export class BasePage {
  constructor() {
   
  }

  // Navega a la URL base de la aplicación.
  navigateToUrl(url) {
    cy.visit(url);
  }

  // Verifica que el título de la página sea el esperado.
  getPageTitle(expectedTitle) {
    cy.title().should('eq',expectedTitle);
  }

  // Verifica que la URL actual sea la URL base.
  getCurrentUrl(expectedUrl) {
    cy.url().should('eq', expectedUrl);
  }

  // Obtiene un elemento de la página basado en el selector proporcionado.
  getElement(selector) {
    return cy.get(selector);
  }
  

  // Realiza un clic en el elemento seleccionado.
  clickElement(selector) {
    this.getElement(selector).click();
  }

  // Escribe el texto especificado en el campo seleccionado.
  typeText(selector, text) {
    this.getElement(selector).type(text);
  }
}
