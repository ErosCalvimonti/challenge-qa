// Importar la clase BasePage y los selectores
import { BasePage } from "./basePage";

export class CalendarPage extends BasePage {
  constructor() {
    super();
  }

  // Método para abrir el calendario (URL base)
  openCalendar() {
    this.navigateToUrl("/");
  }

  checkPageTitle() {
    this.getPageTitle("Calendar Challenge");
  }

  checkUrlCallendar() {
    this.getCurrentUrl(Cypress.config("baseUrl"));
  }

  // Método para navegar al próximo mes
  goToNextMonth() {
    this.clickElement("div[class='Grid_header__yAoy_'] div:nth-child(3)");
  }

  isFebruary() {
    this.getElement("div[class*='Grid_header_'] div:nth-child(2)")
      .should("exist")
      .then(($monthTitle) => {
        const monthText = $monthTitle.text();

        if (!monthText.includes("february")) {
          // Avanza al próximo mes y vuelve a llamar isFebruary
          this.goToNextMonth();

          // Llama de nuevo a isFebruary para verificar si ya es febrero
          this.isFebruary();
        } else {
          cy.log("It's February");
        }
      });
  }

  // Navega hasta febrero y asegura que el evento del Día de la Marmota esté presente
  navigateAndEnsureGroundhogDayEvent() {
    // Usa isFebruary para navegar hasta febrero
    this.isFebruary();

    // Luego, verifica y asegura el evento
    this.ensureGroundhogDayEvent();
  }

  // Verifica si el evento "Groundhog Day" está presente mediante el texto, o lo agrega si no está
ensureGroundhogDayEvent() {
    cy.get(".Grid_spaceHolder__IVVTT > :nth-child(6)")
      .should('have.text', '2') // Selecciona el día 2 de febrero
      .closest("div") // Encuentra el contenedor del día
      .then(($dayContainer) => {
        // Verifica si el texto "Groundhog Day" está presente dentro del contenedor
        if ($dayContainer.text().includes("Groundhog Day")) {
        } else {
        // Si no se encuentra agrega el evento al dia correspondiente
          this.addGroundhogDayEvent();
        }
      });
  }
    // Método para agregar el evento del Día de la Marmota en el día 2 de febrero
  addGroundhogDayEvent() {
    // Selecciona el día 2 de febrero
    cy.get(".Grid_spaceHolder__IVVTT > :nth-child(6)").contains("2").click(); 
    // Ingresa el nombre del evento
    cy.get("textarea").type("Groundhog Day"); 
    // Guarda el evento
    cy.get(".Grid_icon__bYeIv > .Grid_customIcon__JyTa0").click(); 
  }
}
