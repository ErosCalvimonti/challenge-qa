import { CalendarPage } from "../pages/CalendarPage";
const calendarPage = new CalendarPage();
describe("Challenge Cypress Minimalart", () => {
  beforeEach("Navigate to calendar page", () => {
    calendarPage.openCalendar();
  });

  it("Should navigate to the calendar page correctly", () => {
    calendarPage.checkPageTitle();
    calendarPage.checkUrlCallendar();
  });

  //   Iterar hasta que el mes actual sea febrero
  it("Should navigate to February", () => {
    calendarPage.goToFebruary();
  });

  it("Should navigate to February and ensure Groundhog Day event is present if not added", () => {
    calendarPage.goToFebruary();
    calendarPage.ensureGroundhogDayEvent();
  });

  // Test case para borrar el evento del Día de la Marmota
  it("Should delete Groundhog Day event if present", () => {
    // Asegura que esté en febrero
    calendarPage.goToFebruary();
    // Asegura que el evento esté presente para poder borrarlo
    calendarPage.ensureGroundhogDayEvent();
    // Elimina el evento
    calendarPage.deleteGroundhogDayEvent();
    // Verifica que el evento haya sido eliminado
    calendarPage.isGroundhogDayEventDeleted();
  });
});
