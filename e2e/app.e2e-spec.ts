import { AppPage } from './app.po';

describe('toopath-web App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('TooPath let\'s you manage\nyour devices and tracks');
  });
});
