// Importar la clase BasePage y los selectores
import { BasePage } from "./basePage.js";

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

  goToFebruary() {
    this.getElement("div[class*='Grid_header_'] div:nth-child(2)")
      .should("exist")
      .then(($monthTitle) => {
        const monthText = $monthTitle.text();

        if (!monthText.includes("february")) {
          // Avanza al próximo mes y vuelve a llamar isFebruary
          this.goToNextMonth();

          // Llama de nuevo a isFebruary para verificar si ya es febrero
          this.goToFebruary();
        } else {
          cy.log("It's February");
        }
      });
  }

  // Navega hasta febrero y asegura que el evento del Día de la Marmota esté presente
  navigateAndEnsureGroundhogDayEvent() {
    // Usa isFebruary para navegar hasta febrero
    this.goToFebruary();

    // Luego, verifica y asegura el evento
    this.ensureGroundhogDayEvent();
  }

  // Verifica si el evento "Groundhog Day" está presente mediante el texto, o lo agrega si no está
ensureGroundhogDayEvent() {
    this.getElement(".Grid_spaceHolder__IVVTT > :nth-child(6)")
      .should('have.text', '2') // Selecciona el día 2 de febrero
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
    this.getElement(".Grid_spaceHolder__IVVTT > :nth-child(6)").contains("2").click(); 
    // Ingresa el nombre del evento
    this.getElement("textarea").type("Groundhog Day"); 
    // Guarda el evento
    this.getElement(".Grid_icon__bYeIv > .Grid_customIcon__JyTa0").click(); 
  }
  // Método para eliminar el evento del Día de la Marmota si está presente
  deleteGroundhogDayEvent() {
    this.getElement(".Grid_spaceHolder__IVVTT > :nth-child(6)").contains("2").click(); 
    this.getElement(":nth-child(1) > .Grid_reminderContent__pLoKD > .Grid_reminderIcons__4mm3s > .Grid_icon-cancel__HmIzw").click()
    this.getElement(".Grid_icon__bYeIv > .Grid_customIcon__JyTa0").click()

  }

  // Método para verificar que el evento ya no está presente
  isGroundhogDayEventDeleted() {
    return this.getElement("Grid_reminder__OelsH")
    .should('not.exist');
  }
}
