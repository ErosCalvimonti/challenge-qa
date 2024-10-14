import { CalendarPage } from '../pages/CalendarPage';
const calendarPage = new CalendarPage();
describe('Challenge Cypress Minimalart', () => {
    
  beforeEach('Navigate to calendar page', () => {
    calendarPage.openCalendar()
  });

  it('Should navigate to the calendar page correctly', () => {
    calendarPage.checkPageTitle()
    calendarPage.checkUrlCallendar()
  });

//   Iterar hasta que el mes actual sea febrero
  it('Should navigate to February', () => {
    calendarPage.isFebruary()
  });

  it('Should navigate to February and ensure Groundhog Day event is present if not added', () => {
    calendarPage.isFebruary();
    calendarPage.ensureGroundhogDayEvent();
  })

})
