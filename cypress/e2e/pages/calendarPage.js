// Importar la clase BasePage y los selectores
import { BasePage } from './basePage';
import { selectors } from './selectors';

export class CalendarPage extends BasePage {
  constructor() {
    super()
  }

  // Método para abrir el calendario (URL base)
  openCalendar() {
    this.navigate();
  }

  // Método para navegar al próximo mes
  goToNextMonth() {
    this.clickElement(selectors.nextMonthButton);
  }

  // Verifica si el mes actual es Febrero
  isFebruary() {
    return this.getElement(selectors.monthTitle).should('contain', 'February');
  }

  // Verifica si el evento del Día de la Marmota está presente
  isGroundhogDayEventPresent() {
    return this.getElement(selectors.groundhogDayEvent);
  }

  // Agrega el evento del Día de la Marmota
  addGroundhogDayEvent() {
    this.clickElement(selectors.addEventButton);
    this.typeText(selectors.eventNameField, 'Groundhog Day');
    this.clickElement(selectors.saveEventButton);
  }

  // Elimina el evento del Día de la Marmota
  deleteGroundhogDayEvent() {
    this.clickElement(selectors.groundhogDayEvent);
    this.clickElement(selectors.deleteEventButton);
  }
}
