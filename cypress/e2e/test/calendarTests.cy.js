import { CalendarPage } from '../pages/CalendarPage';
const calendarPage = new CalendarPage();
describe('Challenge Cypress Minimalart', () => {
    
  beforeEach('Navigate to calendar page', () => {
    calendarPage.openCalendar()
   
  });

  it('Should navigate to the page correctly', () => {
    calendarPage.getPageTitle()
    calendarPage.getCurrentUrl()
  });

})
