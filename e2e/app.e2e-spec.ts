import { SlotAppPage } from './app.po';

describe('slot-app App', () => {
  let page: SlotAppPage;

  beforeEach(() => {
    page = new SlotAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
