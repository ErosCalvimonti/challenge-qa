export class BasePage {
  constructor() {
    // Configura la URL base desde el archivo de configuración de Cypress.
    this.baseUrl = Cypress.config('baseUrl');
    // Define el título esperado de la página para validaciones.
    this.title = 'Calendar Challenge';
  }

  // Navega a la URL base de la aplicación.
  navigate() {
    cy.visit(this.baseUrl);
  }

  // Verifica que el título de la página sea el esperado.
  getPageTitle() {
    cy.title().should('eq', this.title);
  }

  // Verifica que la URL actual sea la URL base.
  getCurrentUrl() {
    cy.url().should('eq', this.baseUrl);
  }

  // Obtiene un elemento de la página basado en el selector proporcionado.
  getElement(selector) {
    cy.get(selector);
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
