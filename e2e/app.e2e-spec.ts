import { MEANTodoAppPage } from './app.po';

describe('meantodo-app App', function() {
  let page: MEANTodoAppPage;

  beforeEach(() => {
    page = new MEANTodoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
